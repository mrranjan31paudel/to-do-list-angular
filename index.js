require('dotenv').config({ path: __dirname + '/.env' });

var appName = process.env.APP_NAME;
var appVersion = process.env.APP_VERSION;
var appPort = process.env.APP_PORT;
var appHost = process.env.APP_HOST;

var server = require('http-server').createServer();

server.listen(appPort, appHost, function () {
  console.log(`Web Server ${appName}(${appVersion}) is running at http://${appHost}:${appPort}`);
});

module.exports = { server };
