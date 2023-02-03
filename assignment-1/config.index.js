/*
 * Create and export configuration variables
 *
 * windows command prompt> $env:NODE_ENV="staging"
 * windows commant prompt> node index.js
 *
 * Industry default conventions
 * HTTP  PORT:  80
 * HTTPS PORT: 443
 */*
*// 
*// Helpers for various tasks

*// Container for all the helpers
const helpers = {};

*// General welcome message
helpers.welcome = function(data) {
  return {
    message: `${
      data.trimmedPath
    }, my name is Stephen West and I am excited to be doing this node-master-class`
  };
};

*// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str) {
  try {
    let obj = {};
    if (typeof str == "string" && str.trim().length > 0) obj = JSON.parse(str);
    return obj;
  } catch (e) {
    console.log("Erorr helpers.parseJsonToObject: ", e);
    return {};
  }
};

module.exports = helpers;
*// Container for all environments
var environments = {};

*// Staging (default) environment
environments.staging = {
  port: 3000,
  envName: "staging"
};

*// Production environment
environments.production = {
  port: 5000,
  envName: "production"
};

*// Determine which environment was passed as a command-line argument
var currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

*// Check that the current environment is one of the environments above, if not default to staging
var environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

*// Export the module
module.exports = environmentToExport;
