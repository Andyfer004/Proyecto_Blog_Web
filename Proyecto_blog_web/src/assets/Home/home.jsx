import videoAd from "./Video_anuncio.mp4";
import Ferrari1 from "./Ferrari1.jpeg";
import Ferrari2 from "./Ferrari2.png";
import Ferrari3 from "./Ferrari3.jpg";

import Logo from './logo_ferrari.png';
import { Link } from "react-router-dom";

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
          <img src={Logo} alt="logo" width="40" height="40" style={logoStyles} />
          <Link to="/" style={h2Styles}>Home</Link>
          <Link to="/posts" style={h2Styles}>Posts</Link>
          <Link to="/cars" style={h2Styles}>Cars</Link>
          <Link to="/login" style={h2Styles}>Admin</Link>
      </nav>
  );
  
}

const Media = () => {
  return (
      <main>
          <video width="100%" height="100%" autoPlay loop playsInline >
              <source src={videoAd} type="video/mp4" />
          </video>
          <img src={Ferrari3} alt="video" width="100%" height="100%" />
          <img src={Ferrari1} alt="video" width="100%" height="80%" />
          <img src={Ferrari2} alt="video" width="100%" height="100%" />
      </main>

  );
}



const Home = () => {
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


export default Home;