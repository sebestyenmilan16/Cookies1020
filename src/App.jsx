import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CookieManager from './CookieManager'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CookieManager />
    </>
  )
}

export default App
