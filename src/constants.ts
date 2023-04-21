export const VERSION: string = "1.0.0";

export const SERVER_ENVIRONMENT : Reactory.Server.ReactoryEnvironment = {  
    NODE_PATH: process.env.NODE_PATH || '.',
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_DATA_ROOT: process.env.APP_DATA_ROOT || '/data',    
    MONGOOSE: process.env.MONGOOSE || '',
    WORKFLOW_MONGO: process.env.WORKFLOW_MONGO || '',
    API_PORT: `${process.env.API_PORT||4001}`,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
    API_URI_ROOT: process.env.API_URI_ROOT || '',
    API_GRAPHQL_URI: `${process.env.API_URI_ROOT}/api`, 
    CDN_ROOT: process.env.CDN_ROOT || 'http://localhost:4000/cdn',
    MODE: process.env.MODE || 'develop',
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

    OAUTH_APP_ID: process.env.OAUTH_APP_ID || '',
    OAUTH_APP_PASSWORD: process.env.OAUTH_APP_PASSWORD || '',
    OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI || '',
    OAUTH_SCOPES: process.env.OAUTH_SCOPES || '',
    OAUTH_AUTHORITY: process.env.OAUTH_AUTHORITY || '',
    OAUTH_ID_METADATA: process.env.OAUTH_ID_METADATA || '',
    OAUTH_AUTHORIZE_ENDPOINT: process.env.OAUTH_AUTHORIZE_ENDPOINT || '',
    OAUTH_TOKEN_ENDPOINT: process.env.OAUTH_TOKEN_ENDPOINT || '',    

    REACTORY_SITE_URL: process.env.REACTORY_SITE_URL || 'https://localhost:3000',
    REACTORY_APPLICATION_USERNAME: process.env.REACTORY_APPLICATION_USERNAME || 'reactory',
    REACTORY_APPLICATION_EMAIL: process.env.REACTORY_APPLICATION_EMAIL || 'reactory@mail.com',
    REACTORY_APPLICATION_PASSWORD: process.env.REACTORY_APPLICATION_PASSWORD,
    REACTORY_EMAIL_SEND_VIA: process.env.REACTORY_EMAIL_SEND_VIA || 'sendgrid',
    REACTORY_APP_WHITELIST: process.env.REACTORY_APP_WHITELIST || 'http://localhost:3000',
    REACTORY_NATIVEAPP_URI: process.env.REACTORY_NATIVEAPP_URI || 'reactorynative://',
    I18N_FALLBACK: process.env.I18N_FALLBACK || 'en',
    I18N_NS: process.env.I18N_NS || 'reactory', 
    I18N_PRELOAD: process.env.I18N_PRELOAD || 'en',
};