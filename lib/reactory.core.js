(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ReactoryCore = factory());
})(this, (function () { 'use strict';

    var VERSION = "1.0.0";
    ({
      NODE_PATH: process.env.NODE_PATH || '.',
      NODE_ENV: "development" ,
      APP_DATA_ROOT: process.env.APP_DATA_ROOT,
      MONGOOSE: process.env.MONGOOSE,
      WORKFLOW_MONGO: process.env.WORKFLOW_MONGO,
      API_PORT: parseInt("".concat(process.env.API_PORT || 4001)),
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      API_URI_ROOT: process.env.API_URI_ROOT,
      API_GRAPHQL_URI: "".concat(process.env.API_URI_ROOT, "/api"),
      CDN_ROOT: process.env.CDN_ROOT,
      MODE: process.env.MODE,
      LOG_LEVEL: process.env.LOG_LEVEL,
      OAUTH_APP_ID: process.env.OAUTH_APP_ID,
      OAUTH_APP_PASSWORD: process.env.OAUTH_APP_PASSWORD,
      OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI,
      OAUTH_SCOPES: process.env.OAUTH_SCOPES,
      OAUTH_AUTHORITY: process.env.OAUTH_AUTHORITY,
      OAUTH_ID_METADATA: process.env.OAUTH_ID_METADATA,
      OAUTH_AUTHORIZE_ENDPOINT: process.env.OAUTH_AUTHORIZE_ENDPOINT,
      OAUTH_TOKEN_ENDPOINT: process.env.OAUTH_TOKEN_ENDPOINT
    });

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Reactory = /*#__PURE__*/_createClass(function Reactory() {
      _classCallCheck(this, Reactory);
    });

    Reactory.REACTORY_VERSION = VERSION;
    Reactory.Forms = {};

    return Reactory;

}));
//# sourceMappingURL=reactory.core.js.map
