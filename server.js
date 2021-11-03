import express from 'express'

// Express app
const app = express()

// Port to listen on
const PORT = 3000

// Sets up the static directory to serve
app.use(express.static('public'))

// All get requests on the root will return the index.html file
app.get('/', (req, res) => {
  res.send('index.html')
})

// Listen on the port 3000 and log that it is listening
app.listen(PORT, () => {
  console.log(`Server running @ port ${PORT}`)
})
