const express = require('express')

const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

console.log('process.env.PORT', process.env.PORT)
const port = process.env.PORT || 8080

const router = express.Router()

router.use((req, res, next) => {
  console.log('中间件')
  next()
})

router.post('/hello', (req, res) => {
  const { name } = req.body
  console.log('name', name)
  res.json({
    data: `Hello ${name}`
  })
})

app.use('/home', router)

app.listen(port)

console.log('Magic hapens on port ', port)