import './App.css'
import Navbar from './components/Navbar/Navbar'

import { Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <p className='bg-primary-50 font-bold text-2xl'>Likgoad</p>
      <Routes>
      </Routes>
    </>
  )
}

export default App
