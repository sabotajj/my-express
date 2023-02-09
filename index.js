const myExpress = require('./my-express')

let app = myExpress()

app.get('/test', (req, res) => {
    res.write('hello')
    res.end()
})
.use('/test2', (req, res) => {
    res.write('middleware is watching<br>')
})
.get('/test2', (req, res) => {
    res.write('hello from 2')
    res.end()
})
.post('/test3', (req, res) => {
    req.body
})

.listen(4000)
