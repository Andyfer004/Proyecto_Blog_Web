import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Home/logo_ferrari.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ModalUpdate = () => {
    // Estado para manejar la visibilidad del modal
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir el modal
    const openModal = () => {
        setIsOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsOpen(false);
    };

    const [titulo, setTitulo] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const [contenido, setContenido] = useState('');

    

  const handleCreatePost = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    try {
      const response = await fetch('http://3.129.191.211/api/22944/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Suponiendo que necesitas un token de autorización
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          titulo: titulo,
          imagen_url: imagenUrl,
          contenido: contenido,
        }),
      });

      if (response.ok) {
        console.log("Post creado con éxito");
        // Recargar los posts o manejar la actualización del estado global si es necesario
      } else {
        console.error("Error al crear post", response.statusText);
      }
    } catch (error) {
      console.error("Error en la red al crear post", error);
    }
  };

      // Para Actualizar un Post
      const [showUpdateModal, setShowUpdateModal] = useState(false);
      const [currentPost, setCurrentPost] = useState(null);
    
      const handleUpdatePost = (post) => {
          console.log("Estableciendo post actual a:", post);
          setCurrentPost(post); // Asegúrate de pasar el objeto post completo aquí
          setShowUpdateModal(true);
        };
        
    
      const closeUpdateModal = () => setShowUpdateModal(false);
    
      const handleInputChange = (e, field) => {
          setCurrentPost(prevState => ({...prevState, [field]: e.target.value}));
        };
    
        const submitUpdate = async () => {
          try {
            const response = await fetch(`http://44.202.104.77/api/22103/post/${currentPost.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                titulo: currentPost.titulo,
                imagenUrl: currentPost.imagenUrl,
                contenido: currentPost.contenido
              }),
            });
        
            if (response.ok) {
              console.log("Post actualizado con éxito");
              closeUpdateModal();
            } else {
              const errorData = await response.json(); // Esto te puede dar más detalles sobre el error
              console.error("Error al actualizar post", errorData);
            }
          } catch (error) {
            console.error("Error en la red al actualizar post", error);
          }
        };

    return (
        <>
            {/* Botón para activar el modal */}
            <button onClick={openModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
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
                        <form className="p-5 w-full flex flex-col items-center" onSubmit={handleCreatePost}>
                            <div className="w-full">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter title" required="" value={titulo} onChange={(e) => handleInputChange(e, setTitulo)}></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="imagen_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                                <input type="text" name="imagen_url" id="imagen_url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter image URL" required="" value={imagenUrl} onChange={(e) => handleInputChange(e, setImagenUrl)}></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Write product description here" value={contenido} onChange={(e) => handleInputChange(e, setContenido)}></textarea>                    
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{margin: '10px 10px 10px 10px' }}>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

const ModalDelete = ({ postId, onPostDeleted }) => {
    // Estado para manejar la visibilidad del modal
    const [isOpen, setIsOpen] = useState(false);

    // Función para abrir el modal
    const openModal = () => setIsOpen(true);

    // Función para cerrar el modal
    const closeModal = () => setIsOpen(false);

    // Función para confirmar la eliminación del post
    const confirmDeletePost = () => {
        fetch(`http://3.129.191.211/api/22944/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                closeModal(); // Cerrar el modal
                onPostDeleted(postId); // Llamar a la función pasada como prop para manejar la eliminación en el componente padre
            } else {
                console.error('Error al eliminar el post:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error al eliminar el post:', error);
        });
    };

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
    );
};


const Modal = () => {
// Estado para manejar la visibilidad del modal
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir el modal
    const openModal = () => {
        setIsOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsOpen(false);
    };

    const [titulo, setTitulo] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const [contenido, setContenido] = useState('');

    const handleInputChange = (e, setter) => setter(e.target.value);

  const handleCreatePost = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    try {
      const response = await fetch('http://3.129.191.211/api/22944/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Suponiendo que necesitas un token de autorización
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          titulo: titulo,
          imagen_url: imagenUrl,
          contenido: contenido,
        }),
      });

      if (response.ok) {
        console.log("Post creado con éxito");
        // Recargar los posts o manejar la actualización del estado global si es necesario
      } else {
        console.error("Error al crear post", response.statusText);
      }
    } catch (error) {
      console.error("Error en la red al crear post", error);
    }
  };

    return (
        <>
            {/* Botón para activar el modal */}
            <button onClick={openModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
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
                        <form className="p-5 w-full flex flex-col items-center" onSubmit={handleCreatePost}>
                            <div className="w-full">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter title" required="" value={titulo} onChange={(e) => handleInputChange(e, setTitulo)}></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="imagen_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                                <input type="text" name="imagen_url" id="imagen_url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter image URL" required="" value={imagenUrl} onChange={(e) => handleInputChange(e, setImagenUrl)}></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Write product description here" value={contenido} onChange={(e) => handleInputChange(e, setContenido)}></textarea>                    
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{margin: '10px 10px 10px 10px' }}>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

const NavBar = () => {

    const navigate = useNavigate(); // Hook para redirigir al usuario

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
        zIndex: 1000, // Asegurar que esté por encima de otros elementos
    };

    const logoStyles = {
        filter: 'invert(100%)',
        padding: '5%',
        height:'auto',
    };

    const h2Styles = {
        fontFamily: 'Roboto',
        fontSize: '1.5em', 
        fontWeight: 'bold',
        margin: '0',
        padding: '5%',
        color: 'white',
        textDecoration: 'none', 
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        navigate('/login'); // Redirigir al usuario a la página de login
    };

    return (
        <nav style={styles}>
            <img src={Logo} alt="logo" width="40" height="40" style={logoStyles} />
            <Modal />
            <Link to="/posts" style={h2Styles}>Posts</Link>
            <Link to="/" style={h2Styles} onClick={handleLogout}>Logout</Link>
        </nav>
    );
}

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Loading...</h1>
        </div>
    );
};

const PostsLoader = () => {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null); // Estado para manejar errores

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://3.129.191.211/api/22944/posts');

                if (!response.ok) {
                    // Si la respuesta no es 2xx, considerarlo como un error
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                // Aquí puedes agregar validaciones adicionales sobre el formato de los datos si es necesario
                if (!Array.isArray(data)) {
                    // Suponiendo que esperas un array de posts, si no lo es, lanza un error
                    throw new Error("Formato de datos incorrecto");
                }

                setPosts(data);
            } catch (error) {
                // Manejar cualquier error que ocurra durante la fetch o el procesamiento de los datos
                console.error('Error al cargar los posts:', error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1>Error al cargar los posts</h1>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1>No hay posts disponibles</h1>
            </div>
        );
    }

    return (
        <>
            {posts.map(post => (
                <Card key={post.id} post={post} />
            ))}
        </>
    );
};

const Card = ({ post, onPostDeleted }) => {
    const [isColumnLayout, setIsColumnLayout] = React.useState(false);
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
        gap: '1rem',
    };

    const TitleStyles = {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
        flex: '1',
    };

    const textsStyles = {
        color: 'white',
        textAlign: 'justify',
        fontFamily: 'Roboto',
        opacity: '0.8',
        flex: '1',
    };

    const imageStyles = {
        maxHeight: '300px',
        maxWidth: '100%',
        borderRadius: '5px',
        flex: '1',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const handleResize = () => {
        setIsColumnLayout(window.innerWidth <= 768); // Cambiar a disposición de columna si el ancho es menor
    };

    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                        <ModalUpdate />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    

};

Card.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        titulo: PropTypes.string,
        contenido: PropTypes.string,
        imagen_url: PropTypes.string,
        carro_id: PropTypes.null,
    }),
};

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
        zIndex: 1000, // Asegurar que esté por encima de otros elementos
    };

    return (
        <footer style={styles}>
            <p>&copy; 2024 - Todos los derechos reservados Autor: Andy Fuentes</p>
        </footer>
    );
}


const posts = () => {


    const styles = {
        backgroundColor: 'White', // color de fondo
        overflow: 'hidden', // ocultar el desbordamiento del contenido
        minHeight: '100vh', // altura mínima para cubrir toda la pantalla
        display: 'block',
        position : 'relative',
        margin: 0,
        padding: 0,
    };
    return (
        <main style={styles}>
            <NavBar />
            <React.Suspense fallback={<Loading />}>
                <PostsLoader />
            </React.Suspense>
            <Footer />
        </main>
    );
}

export default posts;