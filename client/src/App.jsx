import './App.css'

import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Auth/Login'
import { Register } from './pages/Auth/Register'
import { Navbar } from './components/Navbar/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
