const sinon = require('sinon')
const db = require('../../../config/database')
const Book = require('../../../models/book')

describe('Book', () => {
  describe('.findAll', () => {
    it('calls query on the database', () => {
      const cb = () => {}
      const mock = sinon.mock(db)
      mock.
        expects("query").
        once().
        withArgs("SELECT * FROM books;", cb)

      Book.findAll(cb)

      mock.verify()
    })
  })

  describe('.findById', () => {
    it('calls query on the database, with provided id', () => {
      const cb = () => {}
      const mock = sinon.mock(db)
      mock.
        expects("query").
        once().
        withArgs("SELECT * FROM books WHERE id = ?;", [6], cb)

      Book.findById(6, cb)

      mock.verify()
    })
  })

  describe('.create', () => {
    it('calls query on the database, with provided data', () => {
      const cb = () => {}
      const mock = sinon.mock(db)
      mock.
        expects("query").
        once().
        withArgs('INSERT INTO books (`author`, `title`) VALUES(?, ?)', ["Andreas", "Bad Coding"], cb)

      Book.create('Andreas', 'Bad Coding', cb)

      mock.verify()
    })

  })

  describe('.update', () => {
    it('calls update query on database with id and data', () => {
      const cb = () => {}
      const mock = sinon.mock(db)
      mock.
        expects("query").
        once().
        withArgs('UPDATE books SET `author`=?, `title`=? WHERE `id`=?', ["some", "example", 1], cb)
      Book.update(1, 'some', 'example', cb)
      mock.verify()
    })
  })
})
