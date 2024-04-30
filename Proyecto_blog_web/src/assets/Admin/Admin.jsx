import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Home/logo_ferrari.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


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
            <button  style={{ padding: '10px', fontSize: '16px', color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>New Post</button>
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

const Card = ({ post }) => {
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
            <div style={{ flex: '1' }}> {/* Div para alinear texto a la derecha */}
                <h3 style={TitleStyles}>{post.titulo} </h3>
                <p style={textsStyles}>{post.contenido}</p>
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