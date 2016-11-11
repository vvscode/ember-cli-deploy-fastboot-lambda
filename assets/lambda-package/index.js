var path = require('path');
var FastBoot = require('fastboot');
var outputPath = 'fastboot-dist';
var appName = 'bustle';

var app = new FastBoot({
  distPath: 'fastboot-dist'
});

exports.handler = function(event, context) {
  var options = {
    request: {
      headers: {
        cookie: event.cookie
      },
      get: function() {}
    },
    response: {}
  };

  var statusCode, location;

  app.visit(event.path, options)
    .then(function(result) {
      statusCode = result.statusCode;
      location = result.headers.location;
      return result.html();
    })
    .then(function(html) {
      context.succeed({
        html: html,
        statusCode: statusCode,
        location: location
      });
    });
};
