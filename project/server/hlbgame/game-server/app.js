var pomelo = require('pomelo');
var path = require('path');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'hlbgame');

// app configuration
app.configure('production|development', 'gate', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			useProtobuf : false
		});
});

app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });
});

//mysql db, by hlb
app.loadConfig('mysqlCfg', path.resolve('./config/mysql.json'));
app.configure('production|development', 'gate|connector|login', function(){
  var config = app.get('mysqlCfg');
  var mysql = require('mysql'); // npm install mysql
  var connection = mysql.createConnection(config);
  connection.connect();
  app.set('mysqlClient', connection);
});

//redis db, by hlb
app.configure('production|development', 'gate|connector|login', function(){
  var redisClient = require("redis").createClient(6379, "127.0.0.1", {}); 
  app.set('redisClient', redisClient);
});







// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
