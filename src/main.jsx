import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import App from './App.jsx'
import './index.css'

const convexUrl = import.meta.env.VITE_CONVEX_URL
console.log("URL:", import.meta.env.VITE_CONVEX_URL);
if (!convexUrl) {
  console.error(
    '[Convex] Missing VITE_CONVEX_URL environment variable.\n' +
    'Please make sure your .env file contains:\n' +
    '  VITE_CONVEX_URL=your-convex-deployment-url\n' +
    'Then restart the Vite dev server (press Ctrl+C and run npm run dev again).'
  )
}

const convex = new ConvexReactClient(convexUrl || '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConvexProvider>
  </React.StrictMode>,
)

