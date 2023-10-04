const express = require('express')

// initialize
const route = express.Router()

// Routes
route.get('/', (req, res) => {
  res.send('All my books')
})

route.get('/:bookId', (req, res, next)=>{
  console.log({
    params: req.params,
    query: req.query
  })
  res.status(200).send(`single book, ${req.params.bookId}`)
})

route.post('/', (req, res, next)=>{
  res.send('created a new book')
})

route.put('/:id', (req, res, next)=>{
  res.send('update a book')
})

route.delete('/books/:id', (req, res, next)=>{
  res.send('deleted a book')
})

module.exports = route
