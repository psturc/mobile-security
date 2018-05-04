const fs = require('fs');

const keycloakConfigPath = process.env.KEYCLOAK_CONFIG_PATH || '/etc/secrets/keycloak/config';

const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://secure-app:admin@mongodb/secure-app'
  }
};

// read from file if the KEYCLOAK_CONFIG_PATH env variable is supplied
if (keycloakConfigPath) {
  try {
    config.keycloak = JSON.parse(fs.readFileSync(keycloakConfigPath, 'utf8'));
  } catch (e) {
    console.error(`Error reading keycloak config at ${keycloakConfigPath}\n${e}`);
  }
}

module.exports = config;
