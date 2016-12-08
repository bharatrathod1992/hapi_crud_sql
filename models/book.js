'use strict'
const db = require('../config/database')

class Book {
  static findAll (cb) {
    db.query("SELECT * FROM books;", cb)
  }

  static findById (id, cb) {
    db.query("SELECT * FROM books WHERE id = ?;", [id], cb)
  }

  static create (author, title, cb) {
    const insert = "INSERT INTO books (`author`, `title`) VALUES(?, ?)"

    db.query(insert, [author, title], cb)
  }

  static update ( id, author, title, cb){
    const updateQuery = 'UPDATE books SET `author`=?, `title`=? WHERE `id`=?'
    db.query(updateQuery, [author,title,id],cb)
  }
}

module.exports = Book
