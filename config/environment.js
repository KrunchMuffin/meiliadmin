'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'meiliadmin',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      // meilisearch: {
      //   url: 'http://localhost:7700',
      //   key: 'MASTER_KEY',
      // },
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature

    // Getting rootURL from system environment. For example:
    // ROOTURL=/meiliadmin/ ember build --environment=production
    if (process.env.ROOTURL) {
      ENV.rootURL = process.env.ROOTURL;
    }
  }

  return ENV;
};
