import { Hub } from "aws-amplify/utils";

const NETWORK_LATENCY_MS = 200;

const users = new Map(
  [
    {
      username: "localuser@example.com",
      password: "Password123!",
      attributes: {
        email: "localuser@example.com",
        name: "Local User",
      },
    },
    {
      username: "googleuser@example.com",
      password: null,
      attributes: {
        email: "googleuser@example.com",
        name: "Mock Google User",
        provider: "Google",
      },
    },
  ].map((user) => [user.username.toLowerCase(), user]),
);

let currentUser = null;

const delay = (ms = NETWORK_LATENCY_MS) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const emitAuthEvent = (event, data) => {
  try {
    Hub.dispatch("auth", { event, data }, "mockAuth");
  } catch {
    // Hub might not be available during some tests; ignore silently.
  }
};

const sanitizeUsername = (username = "") =>
  String(username).trim().toLowerCase();

const buildSessionPayload = (user) => ({
  tokens: {
    accessToken: `mock-access-token-${user.username}`,
    idToken: `mock-id-token-${user.username}`,
    refreshToken: `mock-refresh-token-${user.username}`,
  },
  credentials: {
    identityId: `mock-identity-${user.username}`,
  },
  userSub: `mock-sub-${user.username}`,
  signInDetails: {
    loginId: user.username,
  },
});

const ensureAuthenticatedUser = () => {
  if (!currentUser) {
    const err = new Error("User is not signed in");
    err.name = "NotAuthorizedException";
    throw err;
  }
  return currentUser;
};

async function signIn({ username, password }) {
  await delay();
  const key = sanitizeUsername(username);
  const account = users.get(key);
  if (!account || (account.password && account.password !== password)) {
    const err = new Error("Invalid username or password");
    err.name = "NotAuthorizedException";
    throw err;
  }
  currentUser = { ...account };
  emitAuthEvent("signedIn", { username: currentUser.username });
  return {
    isSignedIn: true,
    nextStep: { signInStep: "DONE" },
  };
}

async function signOut() {
  await delay();
  if (currentUser) {
    emitAuthEvent("signedOut", { username: currentUser.username });
  }
  currentUser = null;
  return {};
}

async function signUp({ username, password, options = {} }) {
  await delay();
  const key = sanitizeUsername(username);
  if (users.has(key)) {
    const err = new Error("User already exists");
    err.name = "UsernameExistsException";
    throw err;
  }
  const attributes = {
    email: username,
    ...options.userAttributes,
  };
  users.set(key, { username, password, attributes });
  emitAuthEvent("signUp", { username });
  return {
    isSignUpComplete: true,
    nextStep: { signUpStep: "DONE" },
    userId: username,
  };
}

async function getCurrentUser() {
  await delay();
  const user = ensureAuthenticatedUser();
  return {
    username: user.username,
    userId: user.username,
    signInDetails: {
      loginId: user.username,
    },
  };
}

async function fetchAuthSession() {
  await delay();
  const user = ensureAuthenticatedUser();
  return buildSessionPayload(user);
}

async function fetchUserAttributes() {
  await delay();
  const user = ensureAuthenticatedUser();
  return user.attributes || {};
}

async function deleteUser() {
  await delay();
  const user = ensureAuthenticatedUser();
  users.delete(sanitizeUsername(user.username));
  currentUser = null;
  emitAuthEvent("userDeleted", { username: user.username });
  return {};
}

async function updatePassword({ oldPassword, newPassword }) {
  await delay();
  const user = ensureAuthenticatedUser();
  if (user.password && user.password !== oldPassword) {
    const err = new Error("Invalid current password");
    err.name = "NotAuthorizedException";
    throw err;
  }
  const key = sanitizeUsername(user.username);
  users.set(key, { ...user, password: newPassword });
  currentUser = users.get(key);
  emitAuthEvent("passwordUpdated", { username: user.username });
  return {};
}

async function signInWithRedirect({ provider } = {}) {
  await delay();
  const providerName = provider || "Google";
  const socialUser = users.get("googleuser@example.com");
  currentUser = { ...socialUser, attributes: { ...socialUser.attributes, provider: providerName } };
  emitAuthEvent("signedIn", {
    username: currentUser.username,
    provider: providerName,
  });
  return {
    isSignedIn: true,
    nextStep: { signInStep: "DONE" },
  };
}

async function federatedSignIn(options = {}) {
  return signInWithRedirect(options);
}

async function completeOAuthFlow() {
  await delay(50);
  return { completed: true };
}

const mockAuthProvider = {
  signIn,
  signOut,
  signUp,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
  deleteUser,
  updatePassword,
  signInWithRedirect,
  federatedSignIn,
  completeOAuthFlow,
};

export default mockAuthProvider;
