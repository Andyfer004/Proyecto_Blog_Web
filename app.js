const NavBar = () => {
    const styles = {
        position: 'fixed', // Fijar la posición de la barra de navegación
        top: 0, // Colocarla en la parte superior
        zIndex: 1000, // Asegurar que esté por encima de otros elementos
        background: 'linear-gradient(to bottom, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))', // color de fondo
        color: 'white', // color de texto
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0%',
        alignItems: 'center',
        height: '15vh',
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
            <img src='media/logo_ferrari.png' alt="logo" width="40" height="40" style={logoStyles} />
            <a href='index.html' style={h2Styles}>Home</a>
            <a href='posts/post.html' style={h2Styles}>Posts</a>
            <a href='cars/cars.html' style={h2Styles}>Cars</a>
        </nav>
    );
    
}

const Media = () => {
    return (
        <main>
            <video width="100%" height="100%" autoPlay loop playsInline volume={1}>
                <source src="media/Video_anuncio.mp4" type="video/mp4" />
            </video>
            <img src='media/Ferrari3.jpg' alt="video" width="100%" height="100%" />
            <img src='media/Ferrari1.jpeg' alt="video" width="100%" height="80%" />
            <img src='media/Ferrari2.png' alt="video" width="100%" height="100%" />
        </main>

    );
}



const App = () => {
    const styles = {
        backgroundColor: 'rgba(30, 30, 30, 1)', // color de fondo
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
            <Media />
        </main>
    );
}


const root = document.getElementById('root');
ReactDOM.render(<App />, root);