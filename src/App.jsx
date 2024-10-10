import { useState } from 'react'
import Data from './components/Data'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Data/>
    </>
  )
}

export default App
