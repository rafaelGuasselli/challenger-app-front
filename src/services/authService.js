import "@aws-amplify/react-native";
import "@aws-amplify/rtn-web-browser";

import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import * as amplifyAuthMethods from "aws-amplify/auth";
import Config from "../../env/public.config";
import mockAuthProvider from "./mockAuthService";

const __IS_DEV__ = !Config.production;
function devLog(...args) {
  if (__IS_DEV__) {
    console.log("[AuthService]", ...args);
  }
}

if (!__IS_DEV__) {
  Amplify.configure(Config.Amplify);
} else {
  devLog("Mock auth provider enabled; skipping Amplify.configure");
}

// Redact sensitive fields before logging
const SENSITIVE_KEYS = new Set([
  "password",
  "oldPassword",
  "newPassword",
  "token",
  "idToken",
  "accessToken",
  "refreshToken",
  "jwtToken",
  "secret",
]);

function sanitizeForLog(value, depth = 0) {
  if (!__IS_DEV__) return undefined;
  if (value == null) return value;
  if (depth > 3) return "[Object]";
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean") return value;
  if (value instanceof Error)
    return { name: value.name, message: value.message, stack: value.stack };
  if (Array.isArray(value))
    return value.map((v) => sanitizeForLog(v, depth + 1));
  if (t === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const lowered = k.toLowerCase();
      if (
        SENSITIVE_KEYS.has(k) ||
        lowered.includes("token") ||
        lowered.includes("password")
      ) {
        out[k] = "[REDACTED]";
      } else {
        out[k] = sanitizeForLog(v, depth + 1);
      }
    }
    return out;
  }
  return String(value);
}
/**
 * @typedef {Object} AuthProvider
 * @property {(args: { username: string, password: string, options?: { authFlowType?: string } }) => Promise<any>} signIn - Sign in with username and password.
 * @property {() => Promise<any>} signOut - Sign out the current user.
 * @property {(args: { username: string, password: string, options?: { userAttributes?: Record<string, any> } }) => Promise<any>} signUp - Register a new user.
 */

/**
 * Authentication service that wraps the underlying provider (e.g., AWS Amplify Auth).
 */
class AuthService {
  /**
   * @param {AuthProvider} provider Authentication provider compatible with Amplify.
   */
  constructor(provider) {
    this.provider = provider;
    this._authSubscribers = new Set(); // generic subscribers (all events)
    this._authSubscribersByEvent = new Map(); // eventName => Set<cb>
    this._hubUnsubscribe = null;
    devLog("Initialized with provider methods:", Object.keys(provider || {}));
  }

  /**
   * Sign in with username and password.
   * @param {string} username Email or username.
   * @param {string} password User password.
   * @returns {Promise<any>} Provider result (e.g., session or challenge).
   */
  async login(username, password) {
    devLog("login called for", username);
    return await this.provider
      .signIn({
        username,
        password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      })
      .then((res) => {
        devLog("login succeeded for", username, "result:", sanitizeForLog(res));
        return res;
      })
      .catch((err) => {
        devLog("login failed for", username, err?.message || err);
        throw err;
      });
  }

  /**
   * Sign out the authenticated user.
   * @returns {Promise<any>} Provider result.
   */
  async logout() {
    devLog("logout called");
    try {
      const res = await this.provider.signOut();
      devLog("logout succeeded", "result:", sanitizeForLog(res));
      return res;
    } catch (err) {
      devLog("logout failed", err?.message || err);
      throw err;
    }
  }

  /**
   * Register a new user.
   * @param {string} username Email or username.
   * @param {string} password User password.
   * @param {Record<string, any>} userAttributes User attributes (e.g., email, name).
   * @returns {Promise<any>} Provider result (e.g., confirmation state).
   */
  async register(username, password, userAttributes) {
    devLog("register called for", username);
    return await this.provider
      .signUp({
        username,
        password,
        options: {
          userAttributes,
        },
      })
      .then((res) => {
        devLog(
          "register succeeded for",
          username,
          "result:",
          sanitizeForLog(res),
        );
        return res;
      })
      .catch((err) => {
        devLog("register failed for", username, err?.message || err);
        throw err;
      });
  }

  /**
   * Get the currently authenticated user.
   * @returns {Promise<any>} Current user info or throws if not signed in.
   */
  async getCurrentUser() {
    devLog("getCurrentUser called");
    try {
      const res = await this.provider.getCurrentUser();
      devLog("getCurrentUser succeeded", "result:", sanitizeForLog(res));
      return res;
    } catch (err) {
      devLog("getCurrentUser failed", err?.message || err);
      throw err;
    }
  }

  /**
   * Get the current auth session (tokens, identity, etc.).
   * @returns {Promise<any>} Auth session information.
   */
  async getSession() {
    devLog("getSession called");
    try {
      const res = await this.provider.fetchAuthSession();
      devLog("getSession succeeded", "result:", sanitizeForLog(res));
      return res;
    } catch (err) {
      devLog("getSession failed", err?.message || err);
      throw err;
    }
  }

  /**
   * Fetch attributes for the current user (e.g., email, name).
   * @returns {Promise<Record<string, any>>} Key-value map of user attributes.
   */
  async getUserAttributes() {
    if (typeof this.provider.fetchUserAttributes === "function") {
      devLog("getUserAttributes called");
      try {
        const res = await this.provider.fetchUserAttributes();
        devLog("getUserAttributes succeeded", "result:", sanitizeForLog(res));
        return res;
      } catch (err) {
        devLog("getUserAttributes failed", err?.message || err);
        throw err;
      }
    }
    throw new Error("fetchUserAttributes is not available on the provider");
  }

  /**
   * Permanently delete the currently authenticated user.
   * @returns {Promise<void>}
   */
  async deleteCurrentUser() {
    if (typeof this.provider.deleteUser === "function") {
      devLog("deleteCurrentUser called");
      try {
        const res = await this.provider.deleteUser();
        devLog("deleteCurrentUser succeeded", "result:", sanitizeForLog(res));
        return res;
      } catch (err) {
        devLog("deleteCurrentUser failed", err?.message || err);
        throw err;
      }
    }
    throw new Error("deleteUser is not available on the provider");
  }

  /**
   * Update the current user's password.
   * @param {{ oldPassword: string, newPassword: string }} params
   */
  async updatePassword({ oldPassword, newPassword }) {
    if (typeof this.provider.updatePassword === "function") {
      devLog("updatePassword called (passwords not logged)");
      try {
        const res = await this.provider.updatePassword({
          oldPassword,
          newPassword,
        });
        devLog("updatePassword succeeded", "result:", sanitizeForLog(res));
        return res;
      } catch (err) {
        devLog("updatePassword failed", err?.message || err);
        throw err;
      }
    }
    throw new Error("updatePassword is not available on the provider");
  }

  /**
   * Start Google sign-in using Cognito Hosted UI.
   */
  async signInWithGoogleRedirect() {
    devLog("signInWithGoogleRedirect called");
    try {
      // Some providers require being signed out before redirect
      try {
        await this.provider.signOut?.();
      } catch {}
      if (typeof this.provider.signInWithRedirect === "function") {
        return await this.provider.signInWithRedirect({ provider: "Google" });
      }
      if (typeof this.provider.federatedSignIn === "function") {
        // Legacy fallback
        return await this.provider.federatedSignIn({ provider: "Google" });
      }
      throw new Error("No compatible redirect method found for Google sign-in");
    } catch (err) {
      devLog("signInWithGoogleRedirect failed", err?.message || err);
      throw err;
    }
  }

  /**
   * Complete OAuth redirect flow if current environment requires it (e.g., web).
   */
  async completeOAuthFlowIfPresent() {
    try {
      if (typeof this.provider.completeOAuthFlow === "function") {
        devLog("completeOAuthFlowIfPresent: attempting completion");
        const res = await this.provider.completeOAuthFlow();
        devLog("completeOAuthFlowIfPresent: completed", sanitizeForLog(res));
        return res;
      }
    } catch (err) {
      devLog("completeOAuthFlowIfPresent failed", err?.message || err);
    }
    return undefined;
  }

  /** Initialize a single global Amplify Hub listener for auth events. */
  initAuthListeners() {
    if (this._hubUnsubscribe) return; // already initialized
    devLog("Initializing Hub auth listener");
    this._hubUnsubscribe = Hub.listen("auth", ({ payload }) => {
      const { event, data } = payload || {};
      devLog("Auth event:", event, "data:", sanitizeForLog(data));
      // Notify event-specific subscribers first
      const eventSet = this._authSubscribersByEvent.get(event);
      if (eventSet) {
        for (const cb of eventSet) {
          try {
            cb({ event, data });
          } catch (e) {
            console.warn("Auth subscriber threw", e);
          }
        }
      }
      // Then notify generic subscribers
      for (const cb of this._authSubscribers) {
        try {
          cb({ event, data });
        } catch (e) {
          console.warn("Auth subscriber threw", e);
        }
      }
    });
  }

  /** Subscribe to centralized auth events. Returns an unsubscribe function. */
  subscribeAuth(eventOrCb, maybeCb) {
    // Overload: (eventName: string, cb: Function) or (cb: Function)
    if (typeof eventOrCb === "string" && typeof maybeCb === "function") {
      const eventName = eventOrCb;
      const cb = maybeCb;
      devLog("subscribeAuth add for event:", eventName);
      let set = this._authSubscribersByEvent.get(eventName);
      if (!set) {
        set = new Set();
        this._authSubscribersByEvent.set(eventName, set);
      }
      set.add(cb);
      return () => {
        devLog("subscribeAuth remove for event:", eventName);
        const s = this._authSubscribersByEvent.get(eventName);
        if (s) {
          s.delete(cb);
          if (s.size === 0) this._authSubscribersByEvent.delete(eventName);
        }
      };
    }
    if (typeof eventOrCb === "function" && maybeCb === undefined) {
      const cb = eventOrCb;
      devLog("subscribeAuth add (generic)");
      this._authSubscribers.add(cb);
      return () => {
        devLog("subscribeAuth remove (generic)");
        this._authSubscribers.delete(cb);
      };
    }
    throw new Error("subscribeAuth requires (eventName, cb) or (cb)");
  }
}

const authProvider = __IS_DEV__ ? mockAuthProvider : amplifyAuthMethods;

/**
 * Singleton instance of the auth service configured with Amplify or the mock provider.
 * @type {AuthService}
 */
export const authService = new AuthService(authProvider);

// Convenience named exports to keep existing imports working and provide easy access.
/**
 * Sign in wrapper.
 * @param {{ email: string, password: string }} params
 */
export async function loginUser({ email, password }) {
  return authService.login(email, password);
}

// Convenience named exports to keep existing imports working and provide easy access.
/**
 * Sign in wrapper.
 * @param {{ email: string, password: string }} params
 */
export async function logoutUser() {
  return authService.logout();
}

/**
 * Sign up wrapper.
 * @param {{ name?: string, email: string, password: string }} params
 */
export async function registerUser({ name, email, password }) {
  return authService.register(email, password, { email, name });
}

/**
 * Get current user wrapper.
 */
export async function getCurrentUser() {
  return authService.getCurrentUser();
}

/**
 * Get current session wrapper.
 */
export async function getSession() {
  return authService.getSession();
}

/**
 * Get user attributes wrapper.
 */
export async function getUserAttributes() {
  return authService.getUserAttributes();
}

/**
 * Delete the currently authenticated user.
 */
export async function deleteCurrentUser() {
  return authService.deleteCurrentUser();
}
