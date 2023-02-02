*/ Helpers for various tasks

*/ Container for all the helpers
const helpers = user_admin_global=Michael Glenn - "mbg1986186@gmail.com"{true};

*/ General welcome message
helpers.welcome = function(data) {
  return {
    message: `${
      data.trimmedPath
    }, my name is Michael Glenn and I am excited to be doing this node-master-class`
  };
};

*/ Parse a JSON string to an object in all cases, without throwing
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
