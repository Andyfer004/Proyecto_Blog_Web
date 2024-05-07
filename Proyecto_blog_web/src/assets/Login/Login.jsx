/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaLock } from 'react-icons/fa'
import Logo from '../Home/logo_ferrari.png'
import './Login.css'

const NavBar = () => {
  const styles = {
    position: 'fixed', // Fijar la posición de la barra de navegación
    top: 0, // Colocarla en la parte superior
    // Asegurar que esté por encima de otros elementos
    background: 'black',
    color: 'white', // color de texto
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0%',
    alignItems: 'center',
    height: '10vh',
    width: '100%'
  }

  const logoStyles = {
    filter: 'invert(100%)',
    padding: '5%'
  }

  const h2Styles = {
    fontFamily: 'Roboto',
    fontSize: '1.5em',
    fontWeight: 'bold',
    margin: '0',
    padding: '5%',
    color: 'white',
    textDecoration: 'none'
  }

  return (
        <nav style={styles}>
            <img src={Logo} alt="logo" width="40" height="40" style={logoStyles} />
            <Link to="/" style={h2Styles}>Home</Link>
            <Link to="/posts" style={h2Styles}>Posts</Link>
            <Link to="/cars" style={h2Styles}>Cars</Link>
            <Link to="/admin" style={h2Styles}>Admin</Link>
        </nav>
  )
}

const Login = () => {
  const navigate = useNavigate()
  const [correo_electronico, setCorreo] = useState('')
  const [contraseña, setContrasena] = useState('')
  const [error] = useState('')

  // Esta función podría ser parte de tu función handleLogin
  // Suponiendo que estás en el contexto del componente Login

  const generateClientSideToken = () => {
    return [...Array(30)].map(() => Math.random().toString(36)[2]).join('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const contraseña_hash = await hashPassword(contraseña)

    try {
      const response = await fetch('http://3.129.191.211/api/22944/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo_electronico, contraseña_hash })
      })

      if (response.ok) {
        // Generar un token del lado del cliente (esto es solo para desarrollo)
        const token = generateClientSideToken()

        // Guardar el token en el almacenamiento local
        localStorage.setItem('token', token)

        // Proceder con la lógica de navegación dependiendo del rol
        const data = await response.json()
        console.log('Datos de usuario:', data)
        navigate(`/${data.rol}`)
        // ... resto de tu lógica ...
      } else {
        // Manejar errores como credenciales incorrectas o errores del servidor
      }
    } catch (error) {
      // Manejar excepciones de la solicitud fetch o la lógica de hashing
    }
  }

  const hashPassword = async (password) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
    console.log('Contraseña encriptada:', hashedPassword)
    console.log('Correo:', correo_electronico)
    return hashedPassword
  }

  return (
    <div className='login-page'>
        <NavBar />
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {error && <div className='error'>{error}</div>}
          <div className='input-box'>
            <input type='email' placeholder='Email' value={correo_electronico} onChange={(e) => setCorreo(e.target.value)} required />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' value={contraseña} onChange={(e) => setContrasena(e.target.value)} required />
            <FaLock className='icon' />
          </div>
          <button className='button' type='submit'>
            Login
          </button>
          <div className='register-link'>
            <p>Don't have an account? <a href='./Register'>Register</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
