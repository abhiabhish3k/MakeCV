import { useState } from 'react'
import Header from './components/Headers/Header'
import Footer from './components/Footers/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Footer />
    </>
  )
}

export default App
