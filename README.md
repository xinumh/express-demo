### express

### app1.js

调用 `express`， 创建web应用

```js
const express = require('express')
const app = express()
```

指定外部访问端口，默认8080，启动应用，输出~

```js
const port = process.env.PORT || 8080
app.listen(port)
console.log('Magic hapens on port ', port)
```

创建一个路由对象router，指定访问`/hello`时，页面输出`Hello World`

`app.use`将路由router加载到应用的 `/home`路径，即访问`/home/hello`，返回`Hello World`

```js
const router = express.Router()

router.get('/hello', (req, res) => {
  res.send(`<h1>Hello World</h1>`)
})

app.use('/home', router)
```


