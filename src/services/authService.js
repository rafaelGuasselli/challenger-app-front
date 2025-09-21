import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import * as amplifyAuthMethods from "aws-amplify/auth";
import Config from "../../env/public.config";

Amplify.configure(Config.Amplify);
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
  }

  /**
   * Sign in with username and password.
   * @param {string} username Email or username.
   * @param {string} password User password.
   * @returns {Promise<any>} Provider result (e.g., session or challenge).
   */
  async login(username, password) {
    return await this.provider.signIn({
      username,
      password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    });
  }

  /**
   * Sign out the authenticated user.
   * @returns {Promise<any>} Provider result.
   */
  async logout() {
    return await this.provider.signOut();
  }

  /**
   * Register a new user.
   * @param {string} username Email or username.
   * @param {string} password User password.
   * @param {Record<string, any>} userAttributes User attributes (e.g., email, name).
   * @returns {Promise<any>} Provider result (e.g., confirmation state).
   */
  async register(username, password, userAttributes) {
    return await this.provider.signUp({
      username,
      password,
      options: {
        userAttributes,
      },
    });
  }

  /**
   * Get the currently authenticated user.
   * @returns {Promise<any>} Current user info or throws if not signed in.
   */
  async getCurrentUser() {
    return await this.provider.getCurrentUser();
  }

  /**
   * Get the current auth session (tokens, identity, etc.).
   * @returns {Promise<any>} Auth session information.
   */
  async getSession() {
    return await this.provider.fetchAuthSession();
  }

  /**
   * Fetch attributes for the current user (e.g., email, name).
   * @returns {Promise<Record<string, any>>} Key-value map of user attributes.
   */
  async getUserAttributes() {
    if (typeof this.provider.fetchUserAttributes === "function") {
      return await this.provider.fetchUserAttributes();
    }
    throw new Error("fetchUserAttributes is not available on the provider");
  }

  /**
   * Permanently delete the currently authenticated user.
   * @returns {Promise<void>}
   */
  async deleteCurrentUser() {
    if (typeof this.provider.deleteUser === "function") {
      return await this.provider.deleteUser();
    }
    throw new Error("deleteUser is not available on the provider");
  }

  /** Initialize a single global Amplify Hub listener for auth events. */
  initAuthListeners() {
    if (this._hubUnsubscribe) return; // already initialized
    this._hubUnsubscribe = Hub.listen("auth", ({ payload }) => {
      const { event, data } = payload || {};
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
      let set = this._authSubscribersByEvent.get(eventName);
      if (!set) {
        set = new Set();
        this._authSubscribersByEvent.set(eventName, set);
      }
      set.add(cb);
      return () => {
        const s = this._authSubscribersByEvent.get(eventName);
        if (s) {
          s.delete(cb);
          if (s.size === 0) this._authSubscribersByEvent.delete(eventName);
        }
      };
    }
    if (typeof eventOrCb === "function" && maybeCb === undefined) {
      const cb = eventOrCb;
      this._authSubscribers.add(cb);
      return () => this._authSubscribers.delete(cb);
    }
    throw new Error("subscribeAuth requires (eventName, cb) or (cb)");
  }
}

/**
 * Singleton instance of the auth service configured with Amplify./
 * @type {AuthService}
 */
export const authService = new AuthService(amplifyAuthMethods);

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
