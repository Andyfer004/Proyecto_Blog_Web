import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './assets/Home/home.jsx'
import Posts from './assets/posts/post.jsx'
import Cars from './assets/cars/cars.jsx'
import Login from './assets/Login/Login.jsx'
import Admin from './assets/Admin/Admin.jsx'
import React from 'react'
import { AuthProvider, ProtectedRoute } from './AuthContext.jsx' // Importa el AuthProvider y ProtectedRoute correctamente

function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
