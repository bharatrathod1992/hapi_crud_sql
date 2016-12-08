const request = require('supertest')
const server = require('../../server')
const db = require('../../config/database')

before((done) => {
  const tableCreateStatement = "CREATE TABLE IF NOT EXISTS books ( id INT AUTO_INCREMENT, author VARCHAR(40), title VARCHAR(50), PRIMARY KEY (id));"
  db.query(tableCreateStatement, (error, results, fields) => {
    if (error) return done(error)
    done()
  })
})

afterEach((done) => {
  const truncateTableStatement = "TRUNCATE TABLE books;"
  db.query(truncateTableStatement, (error, results, fields) => {
    if (error) return done(error)
    done()
  })
})


after((done) => {
  const dropTableStatement = "DROP TABLE books;"
  db.query(dropTableStatement, (error, results, fields) => {
    if (error) return done(error)
    done()
  })
})

describe('GET /books', () => {
  it('returns an array of JSON objects from the database', (done) => {
    const insertStatement = 'INSERT INTO books (author, title) VALUES("Gustave Flaubert", "Madame Bovary");'
    db.query(insertStatement, (error, results, fields) => {
      if (error) return done(error)

      request(server.listener).get('/books')
        .expect(200, function(err, resp) {
          expect(resp.body).to.be.instanceof(Array)
          expect(resp.body.length).to.equal(1)
          expect(resp.body[0].id).to.be.a('number')
          expect(resp.body[0].author).to.equal("Gustave Flaubert")
          expect(resp.body[0].title).to.equal("Madame Bovary")
          done()
        })
    })
  })
})

describe('POST /books', () => {
  it('returns status code 201 with and the object', (done) => {
    request(server.listener).post('/books')
      .send({
        author: 'Andreas',
        title: 'How not to be a programmer'
      })
      .expect(201, function (err, resp) {
        if (err) return done(err)

        expect(resp.body.id).to.be.a('number')
        expect(resp.body.author).to.equal('Andreas')
        expect(resp.body.title).to.equal('How not to be a programmer')
        done()
      })
  })
})


describe('PUT /books/:id', () => {
  it('returns response code 204 for successful book update', (done) => {
    const insertStatement = 'INSERT INTO books (author, title) VALUES("Gustave Flaubert", "Madame Bovary");'
    db.query(insertStatement, (error, results, fields) => {
      if (error) return done(error)
      request(server.listener).put('/books/' + results.insertId).send({
              author: 'Gustave Flaubert',
              title: 'Book title changed'
            })
        .expect(204, function(err, resp) {
          expect(resp.body.id).to.be.a('number')
          expect(resp.body.author).to.equal("Gustave Flaubert")
          expect(resp.body.title).to.equal("Book title changed")
          done()
        })
    })
  })
})
