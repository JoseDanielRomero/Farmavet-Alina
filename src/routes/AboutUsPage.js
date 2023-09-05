import { useContext } from 'react';
import { MenuStatusContext } from '../App';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../stylesheets/AboutUsPage.css'

function AboutUsPage() {

  const { menuState, setMenuState } = useContext(MenuStatusContext)

  const handleMenuStatus = () => {
    if (menuState === true) {
      setMenuState(false)
    }
  }

  return (
    <div className='AboutUsPage' onClick={handleMenuStatus} >
      <Navbar />
      <header className='header-about-us'>
        <div className='header-about-us-text-box'>
          <h1 className='header-about-us-title'>Sobre nosotros</h1>
          <p className='header-about-us-subtitle'>Somos un equipo conformado por un talento humano que se ha encargado de ganarse la confianza de cada uno de los propietarios y amantes de las mascotas, ofreciendo un ambiente único, muy agradable, con productos de calidad, servicios y una atención excelente.</p>
        </div>
      </header>
      <main className='main-about-us-container'>
        <article className='main-about-us-medic-text-box'>
          <h3 className='main-about-us-medic-title'>Dra. Yadira Monserrate Zambrano</h3>
          <h6 className='main-about-us-medic-subtitle'>Médico Veterinario y Zootecnista</h6>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default AboutUsPage;