import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../stylesheets/BrandsPage.css'
import farbioPharma from '../images/brands/farbio-pharma.png'
import pronaca from '../images/brands/pronaca.png'
import bayer from '../images/brands/bayer.png'
import genfar from '../images/brands/genfar.png'
import jamesBrown from '../images/brands/james-brown.png'
import biolovet from '../images/brands/biolovet.png'
import { useContext } from 'react';
import { MenuStatusContext } from '../App';

function BrandsPage() {

  const { menuState, setMenuState } = useContext(MenuStatusContext)

  const handleMenuStatus = () => {
    if (menuState === true) {
      setMenuState(false)
    }
  }

  return (
    <div className='BrandsPage' onClick={handleMenuStatus}>
      <Navbar />
        <header className='header-cart-container'>
          <h1 className='header-cart-title'>Tus marcas favoritas</h1>
        </header>
        <main className='main-brands-container'>
          <article className='main-brands-section-container'>
            <section className='main-brand-box'>
              <img src={farbioPharma} className='main-brand-image' />
            </section>
            <section className='main-brand-box'>
              <img src={pronaca} className='main-brand-image' />
            </section>
            <section className='main-brand-box'>
              <img src={genfar} className='main-brand-image' />
            </section>
            <section className='main-brand-box'>
              <img src={bayer} className='main-brand-image' />
            </section>
            <section className='main-brand-box'>
              <img src={biolovet} className='main-brand-image' />
            </section>
            <section className='main-brand-box'>
              <img src={jamesBrown} className='main-brand-image' />
            </section>
          </article>
        </main>
      <Footer />
    </div>
  )
}

export default BrandsPage;