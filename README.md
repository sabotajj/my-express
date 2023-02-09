# myExpress
This module is based on `http` npm package.



## Initialization
First of all, to load the dependencies run `npm i`

## Example
```js
const myExpress = require('./my-express')

let app = myExpress()
```

## Adding Methods

### Example
```js
app.get('/yoururl', function(req, res) {
    // handle your GET request here
    // response should be written in res.write()
    res.write('I got your first request')
    res.end()
})
```
Similarly `post` method is supported. Request body can be read from req.body as string.

## Adding middlewares

### Example
```js
app.use('/yoururl', function(req, res) {
    // req and res can be used. next handler will
    // use the modified req, res
    // e.g
    res.write('handled req here')
})
.get('/yoururl', function(req, res) {
    res.write('got the request')
    res.end()
})
```

## Starting server
`.listen(port)` method be executed

### Example
```js
app.listen(8000)
```


