import Navbar from '../components/Navbar'
import '../stylesheets/Homepage.css'

function Homepage() {
  return (
    <div className='Homepage'>
      <Navbar />
      <header className='header-homepage'>
        <div className='header-text-box'>
          <h1 className='header-title'>Somos tú Farmacia Veterinaria<br></br> de confianza</h1>
          <p className='header-subtitle'>Estamos aquí para ofrecerte una amplia gama de marcas líderes en medicamentos para mascotas y otros productos de alimentación y vestido.</p>
        </div>
      </header>
    </div>
  )
}

export default Homepage