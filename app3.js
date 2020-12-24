const express = require('express')

const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

console.log('process.env.PORT', process.env.PORT)
const port = process.env.PORT || 8080

const router = express.Router()

// router.get('/hello/:name', (req, res) => {
//   const { name } = req.params
//   res.json({
//     data: `Hello ${name}`
//   })
// })

router.post('/hello', (req, res) => {
  const { name } = req.body
  res.json({
    data: `Hello ${name}`
  })
})

app.use('/home', router)

app.listen(port)

console.log('Magic hapens on port ', port)