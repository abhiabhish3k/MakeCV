import { useState } from 'react'
import Header from './components/Headers/Header'
import Footer from './components/Footers/Footer'
import Form from './components/Form'
import Preview from './components/Preview'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col lg:flex-row overflow-hidden">
         <div className="h-full w-full overflow-y-auto border-r border-slate-200 bg-white lg:w-1/2">
         <Form />
         </div>

         <div className="h-full w-full overflow-y-auto bg-slate-100 lg:w-1/2">
         <Preview />
         </div>

      </main>
      <Footer />
    </>
  )
}

export default App
