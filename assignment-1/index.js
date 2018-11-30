/*
 * Primary file for API
 *
 * Assignment 1 - Hello World
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");
const helpers = require("./helpers");

// Configure the server to respond to all requests with a string
const server = http.createServer(function(req, res) {
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  //Get the headers as an object
  const headers = req.headers;

  // Get the payload,if any
  let decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  req.on("end", function() {
    buffer += decoder.end();

    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    const chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data object to send to the handler
    let data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: helpers.parseJsonToObject(buffer.toString)
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload) {
      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Use the payload returned from the handler, or set the default payload to an empty object
      payload = typeof payload == "object" ? payload : {};

      // Convert the payload to a string
      let payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log(trimmedPath, statusCode);
    });
  });
});

// Start the server
server.listen(config.port, function() {
  console.log(
    `The server is up and running on port ${config.port} in ${
      config.envName
    } mode.`
  );
});

// Define all the handlers
let handlers = {};

// Sample handler
handlers.hello = function(data, callback) {
  callback(200, helpers.welcome(data));
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

// Define the request router
let router = {
  hello: handlers.hello
};
