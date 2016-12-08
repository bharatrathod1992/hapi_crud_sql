const Hapi = require('hapi')
const server = new Hapi.Server()
const Book = require('./models/book')

server.connection({ port: 3000 })

server.route({
  method: 'GET',
  path: '/books',
  handler: function (request, reply) {
    Book.findAll((error, results, fields) => {
      reply(results)
    })
  }
})

server.route({
  method: 'POST',
  path: '/books',
  handler: (request, reply) => {
    Book.create(request.payload.author, request.payload.title, (error, result) => {
      Book.findById(result.insertId, (error, results, fields) => {
        reply(results[0]).code(201)
      })
    })
  }
})


server.route({
  method: 'PUT',
  path: '/books/{id}',
  handler: (request, reply) => {
    Book.update(request.params.id, request.payload.author, request.payload.title, (error, result) => {
      Book.findAll((error, results, fields) => {
        reply(results[0])
      })
    })
  }
})

module.exports = server
