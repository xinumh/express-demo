### express

链接[https://github.com/summer0216/ruanyifeng/blob/master/demos/README.md#express]

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

### app2.js

添加参数 :name, 可以从req.params.name 拿到传入的参数

```js
router.get('/hello/:name', (req, res) => {
  res.send(`<h1>Hello World ${req.params.name}</h1>`)
})
```

设置port，配置package.json文件

```js
const port = process.env.PORT || 8080
```

package.json

```json
"scripts": {
   "start": "set PORT=3000 && node app2.js"
 }
```

npm start

```js
PS D:\demo> npm  start
> set PORT=3000 && node app3.js

process.env.PORT 3000
Magic hapens on port  3000
```



### app3.js

返回json数据

```js
router.get('/hello/:name', (req, res) => {
  const { name } = req.params
  res.json({
    data: `Hello ${name}`
  })
})
```

浏览器输入地址`http://localhost:8080/home/hello/haha`, 返回：

```js
{"data":"Hello haha"}
```

改用`post`请求，用`req.body`接受参数：

```js
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// Content-Type: application/x-www-form-urlencoded

router.post('/hello', (req, res) => {
  const { name } = req.body
  res.json({
    data: `Hello ${name}`
  })
})
```

`body-parser`模块的作用，是对`POST`、`PUT`、`DELETE`等 HTTP 方法的数据体进行解析。`app.use`用来将这个模块加载到当前应用。有了这两句，就可以处理`POST`、`PUT`、`DELETE`等请求了



### app4.js

```js
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

```

结果：

```js
PS D:\demo> node .\app4.js
process.env.PORT undefined
Magic hapens on port  8080
中间件
name abc
```

`router.use`的作用是加载一个函数。这个函数被称为中间件，作用是在请求被路由匹配之前，先进行一些处理。上面这个中间件起到 logging 的作用，每收到一个请求，就在命令行输出一条记录。请特别注意，这个函数内部的`next()`，它代表下一个中间件，表示将处理过的请求传递给下一个中间件。这个例子只有一个中间件，就进入路由匹配处理（实际上，`bodyparser`、`router`本质都是中间件，整个 Express 的设计哲学就是不断对 HTTP 请求加工，然后返回一个 HTTP 回应）。


