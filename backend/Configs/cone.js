const mysql = require('mysql');
const data = require('./conf');
const logger = require('./Logger');

const mysqlConnection = mysql.createConnection({
  host: data.host,
  user: data.user,
  password: data.password,
  database: data.database,
  port: data.port,
  multipleStatements: true
});


mysqlConnection.connect(function (err) {
  if (err) {
    logger.error(err);
    return;
  } else {
    logger.info("Conexion a la DB completada exitosamente");
  }
});

module.exports = mysqlConnection;
