var mysql = require('mysql2');
var pool  = mysql.createPool({
  connectionLimit  : 500,
  host             : "localhost",
  user             : "root",
  password         : "1qaz2wsx",
  database         : "csc317db",
  debug            : false
});

const promisePool = pool.promise();
module.exports = promisePool;