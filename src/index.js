import * as React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const initialData = window.__INITIAL__DATA__

ReactDOM.hydrate(<App {...initialData} />, document.getElementById('root'))
