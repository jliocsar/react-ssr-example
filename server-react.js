import express from 'express'
import webpack from 'webpack'
import * as React from 'react'
import ReactDOMServer from 'react-dom/server'

import webpackConfig from './webpack.config'
import App from './src/App'

// Port to listen on
const PORT = 3000

// Express app
const app = express()

// Sets up the static directory to serve
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello from server-side 😄')
})

// All get requests on the root will return server-side rendered app
app.get('/:username', (req, res) => {
  const compiler = webpack(webpackConfig)

  // Here we can pass any props to the server-side App, such as initial state
  const { username } = req.params
  const component = ReactDOMServer.renderToString(<App username={username} />)

  compiler.run((err, stats) => {
    if (err) {
      return res.status(500).send(err)
    }

    const { assets } = stats.toJson({
      hash: true,
    })
    const scripts = assets
      .map(({ name }) => `<script src=${`/assets/js/${name}`}></script>`)
      .join('')

    return compiler.close(() => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>React SSR</title>
            <script>window.__INITIAL__DATA__ = ${JSON.stringify({
              username,
            })}</script>
          </head>
          <body>
            <div id="root">${component}</div>
            ${scripts}
          </body>
        </html>
      `)
    })
  })
})

// Listen on the port 3000 and log that it is listening
app.listen(PORT, () => {
  console.log(`Server running @ port ${PORT}`)
})
