/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Logo from '../Home/logo_ferrari.png'
import { Link, useNavigate } from 'react-router-dom'

const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return {
    values,
    handleChange,
    handleSubmit
  }
}

const useApi = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

const ModalUpdate = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const { values, handleChange, handleSubmit } = useForm({
    titulo: post.titulo,
    imagen_url: post.imagen_url,
    contenido: post.contenido
  }, () => updatePost(post.id))

  const updatePost = async () => {
    try {
      console.log(values) // Antes del fetch para ver los valores actuales que se enviarán
      const response = await fetch(`http://3.129.191.211/api/22944/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
      })

      closeModal() // Cierra el modal inmediatamente después de enviar la solicitud
      window.location.reload()
      if (response.ok) {
        console.log('Post actualizado con éxito')
        window.location.reload() // Recarga la página para ver los cambios
      } else {
        const errorData = await response.json()
        console.error('Error al actualizar post', errorData)
      }
    } catch (error) {
      console.error('Error en la red al actualizar post', error)
    }
  }

  return (
        <>
            {/* Botón para activar el modal */}
            <button onClick={openModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Update Post
            </button>

            {/* Modal principal */}
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isOpen ? 'flex' : 'hidden'} items-center justify-center overflow-y-auto overflow-x-hidden fixed inset-0 z-50`}>
                <div className="relative p-4 w-full max-w-md">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Post
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {/* Modal body con el formulario */}
                        <form className="p-5 w-full flex flex-col items-center" onSubmit={handleSubmit}>
                            <div className="w-full">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>`
                                <input type="text" name="titulo" id="titulo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter title" required="" value={values.titulo} onChange={handleChange}></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="imagen_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                                <input type="text" name="imagen_url" id="imagen_url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter image URL" required="" value={values.imagen_url} onChange={handleChange}></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                <textarea id="contenido" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Write product description here" value={values.contenido} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ margin: '10px 10px 10px 10px' }}>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
  )
}

const ModalDelete = ({ postId, onPostDeleted }) => {
  // Estado para manejar la visibilidad del modal
  const [isOpen, setIsOpen] = useState(false)

  // Función para abrir el modal
  const openModal = () => setIsOpen(true)

  // Función para cerrar el modal
  const closeModal = () => setIsOpen(false)

  // Función para confirmar la eliminación del post
  const confirmDeletePost = () => {
    fetch(`http://3.129.191.211/api/22944/posts/${postId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          window.location.reload()
          closeModal() // Cerrar el modal
          onPostDeleted(postId) // Llamar a la función pasada como prop para manejar la eliminación en el componente padre
        } else {
          console.error('Error al eliminar el post:', response.statusText)
        }
      })
      .catch(error => {
        console.error('Error al eliminar el post:', error)
      })
  }

  return (
        <>
            <button onClick={openModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Delete Post
            </button>

            <div className={`${isOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 justify-center items-center overflow-y-auto overflow-x-hidden`}>
                <div className="relative p-4 w-full max-w-md">
                    <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 rounded-lg text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
                            <button onClick={confirmDeletePost} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5">
                                Yes, I'm sure
                            </button>
                            <button onClick={closeModal} className="ml-3 text-gray-900 bg-white border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5">
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const createPost = async () => {
    try {
      const response = await fetch('http://3.129.191.211/api/22944/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
      })

      closeModal() // Cierra el modal inmediatamente después de enviar la solicitud
      window.location.reload()
      if (response.ok) {
        console.log('Post creado con éxito')
        window.location.reload() // Recarga la página para ver los cambios
      } else {
        console.error('Error al crear post', await response.json())
      }
    } catch (error) {
      console.error('Error en la red al crear post', error)
    }
  }

  const { values, handleChange, handleSubmit } = useForm({
    titulo: '',
    imagen_url: '',
    contenido: ''
  }, createPost)

  return (
        <>
            {/* Botón para activar el modal */}
            <button onClick={openModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Create Post
            </button>

            {/* Modal principal */}
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isOpen ? 'flex' : 'hidden'} items-center justify-center overflow-y-auto overflow-x-hidden fixed inset-0 z-50`}>
                <div className="relative p-4 w-full max-w-md">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Post
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {/* Modal body con el formulario */}
                        <form className="p-5 w-full flex flex-col items-center" onSubmit={handleSubmit}>
                            <div className="w-full">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" name="titulo" id="titulo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter title" required="" value={values.titulo} onChange={handleChange}></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="imagen_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                                <input type="text" name="imagen_url" id="imagen_url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter image URL" required="" value={values.imagen_url} onChange={handleChange}></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="contenido" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                <textarea name='contenido' id="contenido" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Write product description here" value={values.contenido} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ margin: '10px 10px 10px 10px' }}>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
  )
}

const NavBar = () => {
  const navigate = useNavigate() // Hook para redirigir al usuario

  const styles = {
    position: 'fixed', // Fijar la posición de la barra de navegación
    top: 0, // Colocarla en la parte superior
    background: 'black',
    color: 'white', // color de texto
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0%',
    alignItems: 'center',
    height: '10vh',
    width: '100%',
    zIndex: 1000 // Asegurar que esté por encima de otros elementos
  }

  const logoStyles = {
    filter: 'invert(100%)',
    padding: '5%',
    height: 'auto'
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

  const handleLogout = () => {
    localStorage.removeItem('token') // Eliminar el token del localStorage
    navigate('/login') // Redirigir al usuario a la página de login
  }

  return (
        <nav style={styles}>
            <img src={Logo} alt="logo" width="40" height="40" style={logoStyles} />
            <Modal />
            <Link to="/posts" style={h2Styles}>Posts</Link>
            <Link to="/" style={h2Styles} onClick={handleLogout}>Logout</Link>
        </nav>
  )
}

const Loading = () => {
  return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Loading...</h1>
        </div>
  )
}

const PostsLoader = () => {
  const [posts, setPosts] = useState(null)
  const { data, loading, error } = useApi('http://3.129.191.211/api/22944/posts')

  React.useEffect(() => {
    setPosts(data)
  }, [data])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h1>Error al cargar los posts</h1>
        </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h1>No hay posts disponibles</h1>
        </div>
    )
  }

  return (
      <>
        {posts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </>
  )
}

const Card = ({ post, onPostDeleted }) => {
  const [isColumnLayout, setIsColumnLayout] = React.useState(false)
  const cardStyles = {
    boxSizing: 'border-box',
    padding: '2%',
    margin: '5rem 0 0 0',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    backgroundColor: 'rgba(138, 1, 0, 1)',
    display: 'flex',
    alignItems: isColumnLayout ? 'center' : 'center', // Centrar contenido verticalmente o al inicio
    flexDirection: isColumnLayout ? 'column' : 'row',
    gap: '1rem'
  }

  const TitleStyles = {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto',
    flex: '1'
  }

  const textsStyles = {
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'Roboto',
    opacity: '0.8',
    flex: '1'
  }

  const imageStyles = {
    maxHeight: '300px',
    maxWidth: '100%',
    borderRadius: '5px',
    flex: '1',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const handleResize = () => {
    setIsColumnLayout(window.innerWidth <= 768) // Cambiar a disposición de columna si el ancho es menor
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
        <div style={cardStyles}>
            <img src={`${post.imagen_url}`} alt={post.titulo} style={imageStyles} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: '1' }}>
                    <h3 style={TitleStyles}>{post.titulo}</h3>
                    <p style={textsStyles}>{post.contenido}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ marginRight: '10px' }}>
                        <ModalDelete postId={post.id} onPostDeleted={onPostDeleted} />
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                        <ModalUpdate post={post} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

Card.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    titulo: PropTypes.string,
    contenido: PropTypes.string,
    imagen_url: PropTypes.string,
    carro_id: PropTypes.null
  }),
  onPostDeleted: PropTypes.func.isRequired
}

ModalDelete.propTypes = {
  postId: PropTypes.number,
  onPostDeleted: PropTypes.func
}

ModalUpdate.propTypes = {
  post: PropTypes.object.isRequired
}

const Footer = () => {
  const styles = {
    position: 'fixed', // Fijar la posición del footer
    bottom: 0, // Colocarla en la parte inferior
    background: 'black',
    color: 'white', // color de texto
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0%',
    height: '5vh',
    width: '100%',
    zIndex: 1000 // Asegurar que esté por encima de otros elementos
  }

  return (
        <footer style={styles}>
            <p>&copy; 2024 - Todos los derechos reservados Autor: Andy Fuentes</p>
        </footer>
  )
}

const posts = () => {
  const styles = {
    backgroundColor: 'White', // color de fondo
    overflow: 'hidden', // ocultar el desbordamiento del contenido
    minHeight: '100vh', // altura mínima para cubrir toda la pantalla
    display: 'block',
    position: 'relative',
    margin: 0,
    padding: 0
  }
  return (
        <main style={styles}>
            <NavBar />
            <React.Suspense fallback={<Loading />}>
                <PostsLoader />
            </React.Suspense>
            <Footer />
        </main>
  )
}

export default posts
