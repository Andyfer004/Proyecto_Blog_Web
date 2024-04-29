import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../Home/logo_ferrari.png';

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
        width: '100%',
    };

    const logoStyles = {
        filter: 'invert(100%)',
        padding: '5%',
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
    
    return (
        <nav style={styles}>
            <img src={Logo} alt="logo" width="40" height="40" style={logoStyles} />
            <Link to="/" style={h2Styles}>Home</Link>
            <Link to="/posts" style={h2Styles}>Posts</Link>
            <Link to="/cars" style={h2Styles}>Cars</Link>
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
    const [cars, setCars] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null); // Estado para manejar errores

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://3.129.191.211/api/22944/cars');

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

                setCars(data);
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
                <h1>Error: {error}</h1>
            </div>
        );
    }

    if (cars.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1>No hay autos para mostrar</h1>
            </div>
        );
    }

    return (
        <>
            {cars.map(car => (
                <Card key={car.id} car={car} />
            ))}
        </>
    );
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
const Card = ({ car }) => {
    const cardStyles = {
        boxSizing: 'border-box',
        padding: '2rem',
        margin: '5rem 0 0 0',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        backgroundColor: 'rgba(138, 1, 0, 1)',
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem',
    };

    const textsStyles = {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
    };

    const imageStyles = {
        maxHeight: '200px',
        maxWidth: '100%',
        borderRadius: '5px',
    };

    return (
        <div style={cardStyles}>
            <img src={`${car.imagen_base64}`} alt={car.modelo} style={imageStyles} />
            <div style={{ flex: '1' }}> {/* Div para alinear texto a la derecha */}
                <h3 style={textsStyles}>{car.marca} {car.modelo}</h3>
                <p style={textsStyles}>Año: {car.anio}</p>
                <p style={textsStyles}>{car.descripcion}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    car: PropTypes.shape({
        id: PropTypes.number,
        marca: PropTypes.string,
        modelo: PropTypes.string,
        anio: PropTypes.number,
        descripcion: PropTypes.string,
        imagen_base64: PropTypes.string,
    }),
};


const Cars = () => {


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


export default Cars;

