var mysql = require('mysql')
  , dbConfig = require('./config')
  , connection = mysql.createConnection(dbConfig)
  ;