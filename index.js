const express = require('express')
const bookRoutes = require('./routes/bookRoutes.js')

// initialize
const app = express()

// Middleware
app.use(express.json())

app.use('/books', bookRoutes)
// app.use('/users', usersRoutes)

app.post('/users', (req, res, next)=>{
  res.send('created a new book')
})
app.get('/users', (req, res)=> {
  res.send('All users')
})
app.put('/users/:id/:user_id', (req, res, next)=> {
  console.log({
    params: req.params,
    query: req.query
  })

  res.send(`edited a book  ${req.params.id}`)
})

// dummy db
const task_manager = []

app.post('/task_manager', (req, res, next)=>{
  console.log(req.body)
  const {title, description, status, date_created} = req.body
  let id = task_manager.length + 1
  task_manager.push({id, title, description, status, date_created})

  res.send(task_manager)
})

app.get('/task_manager', (req, res, next)=>{
  res.send(task_manager)
})

app.get('/task_manager/:id', (req, res, next)=>{
  const {id} = req.params
  const task = task_manager.find(task=> task.id === id)
  res.send(task)
})

app.put('/task_manager/:id', (req, res, next)=>{
  const {id} = req.params
  const {title, description, status, date_created} = req.body
  console.log(req.body)
  const task = task_manager.find(task=> task.id === parseInt(id))
  console.log(task)
  task.title = title
  task.description = description
  task.status = status
  task.date_created = date_created

  res.send(task_manager)
})

app.delete('/task_manager/:id', (req, res, next)=>{
  const {id} = req.params
  const task = task_manager.find(task=> task.id === parseInt(id))
  const index = task_manager.indexOf(task)
  task_manager.splice(index, 1)

  res.send(task_manager)
})

// Error handling middleware (must be defined last)
app.use((error, req, res, next) => {
  console.error(error.stack); // Log the error stack trace

  res.status(500).send('Something went wrong! Please try again later');
  next();
});

app.listen(3000, ()=>{
  console.log('listening on port 3000')
})
