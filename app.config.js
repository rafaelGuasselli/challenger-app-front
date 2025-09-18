// Dynamically build the Expo config, injecting values from .env into `extra`.
// This lets the app read runtime config without additional libraries.

const fs = require('fs');
const path = require('path');

function loadDotEnv(file = '.env') {
  try {
    const p = path.resolve(__dirname, file);
    if (!fs.existsSync(p)) return {};
    const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
    const out = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      out[key] = value;
    }
    return out;
  } catch (e) {
    console.warn('Failed to read .env:', e);
    return {};
  }
}

const appJson = require('./app.json');

module.exports = ({ config }) => {
  const env = loadDotEnv();

  // Mirror keys as both plain and EXPO_PUBLIC_* for flexibility.
  const extraFromEnv = {
    REGION: env.REGION,
    USER_POOL_ID: env.USER_POOL_ID,
    USER_POOL_CLIENT_ID: env.USER_POOL_CLIENT_ID,
    HTTP_API: env.HTTP_API,
    EXPO_PUBLIC_REGION: env.REGION,
    EXPO_PUBLIC_USER_POOL_ID: env.USER_POOL_ID,
    EXPO_PUBLIC_USER_POOL_CLIENT_ID: env.USER_POOL_CLIENT_ID,
    EXPO_PUBLIC_HTTP_API: env.HTTP_API,
  };

  const base = appJson.expo || {};

  return {
    ...config,
    ...base,
    extra: {
      ...(base.extra || {}),
      ...extraFromEnv,
    },
  };
};

