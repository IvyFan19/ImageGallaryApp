var mysql = require('mysql2');
var pool  = mysql.createPool({
  connectionLimit  : 50,
  host             : "localhost",
  user             : "kk",
  password         : "1qaz2wsx",
  database         : "csc317db",
  debug            : false
});

const promisePool = pool.promise();
module.exports = promisePool;