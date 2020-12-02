const express = require('express')

const app = express()

const port = process.env.PORT || 8080

const router = express.Router()

router.get('/hello', (req, res) => {
  res.send(`<h1>Hello World</h1></h1>`)
})

app.use('/home', router)

app.listen(port)

console.log('Magic hapens on port ', port)