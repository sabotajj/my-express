const http = require('http')

function myExpress() {
    const app = {}
    const routes = []
    let started = false

    app.listen = (port, callback) => {
        if (started) {
            throw new Error('server already started')
        }
        http.createServer(function(req, res) {

            req.on('end', () => {
                // here we will handle urls
                for (const route of routes) {
                    if (route.isMiddleware && route.url === req.url) {
                        route.handler(req, res)
                        continue
                    }
                    if (route.method !== req.method) {
                        continue
                    }
                    if (route.url !== req.url) {
                        continue
                    }
                    route.handler(req, res)
                    break
                }
            })
            req.on('data', chunk => {
                if(chunk) {
                    req.body += chunk.toString() // chunk is buffer
                }
            })
        })
        .listen(port)

        callback && callback()
    }
    app.post = (url, handler) => {
        routes.push({url, method: 'POST', handler})
        return app
    }
    app.get = (url, handler) => {
        routes.push({url, method: 'GET', handler})
        return app
    }
    app.use = (url, handler) => {
        routes.push({url, isMiddleware: true, handler})
        return app
    }
    app.missing = handler => {
        handler(req, res)
        return app
    }
    return app
}

module.exports = myExpress
