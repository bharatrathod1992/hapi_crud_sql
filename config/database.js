const mysql = require('mysql')

const env = process.env.NODE_ENV || 'development'
const database = 'books_' + env
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: database
})

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }

  // console.log('connected as id ' + connection.threadId)
})

module.exports = connection
