interface Props {
  children: React.ReactNode,
}

import { useRef } from 'react'
import './App.css'
import PageLinks from './components/PageLinks'
import CategoriasSlots from './components/CategoriasSlots'

function App(props: Props) {
  const { children } = props;
  const categoriasRefDesk = useRef<HTMLUListElement>(null!)
  const categoriasRefMob = useRef<HTMLUListElement>(null!)
  const menuRef = useRef<HTMLUListElement>(null!) // esto sirve para referenciar el ul del menu explicitamente. 
  // el ! al final es para que no tire error de q puede ser nulo
  const year = new Date().getFullYear();

  const toggleMenu = () => {
    innerWidth < 500 ? menuRef.current.classList.toggle('w-[85%]') : menuRef.current.classList.toggle('w-screen');
  }
  const toggleCategoriasMobile = () => {
    categoriasRefMob.current.classList.toggle('hidden');
  }
  // Desktop categorias toggle
  const toggleCategoriasDesktopOn = () => {
    categoriasRefDesk.current.classList.remove('hidden');
  }
  const toggleCategoriasDesktopOff = () => {
    categoriasRefDesk.current.classList.add('hidden');
  }
  return (
    <>
      <header className={`relative z-30 flex items-center justify-center bg-[#111b] sticky top-0 w-full`}>
        <div id='mobile-nav' className='lg:hidden'>
          <nav className='bg-[#111]'>
            <ul ref={menuRef} id='menu' className='flex flex-col gap-10 justify-center overflow-hidden fixed left-0 bg-[#1117] backdrop-blur-sm transition-[width] duration-350 ease-in-out w-0 h-screen z-50'>
              <PageLinks title="Inicio" link='/' />
              <PageLinks title="Contacto" link='/contacto' />
              <PageLinks title="Categorías" link='#' onclick={toggleCategoriasMobile} >
                <i className="fa-solid fa-chevron-down"></i>
              </PageLinks>
              <ul className='text-[#ccc] flex flex-col ml-5 hidden' ref={categoriasRefMob}>
                <CategoriasSlots text="Autos" link="/categorias/autos" clases='w-[85%]' />
                <CategoriasSlots text="Camionetas" link="/categorias/camionetas" clases='w-[85%]' />
                <CategoriasSlots text="Motos" link="/categorias/motos" clases='w-[85%]' />
              </ul>
            </ul>
          </nav>
          <button className='fixed top-0 left-0 z-50 flex flex-col gap-1 p-5 bg-[#2228] outline outline-gray-200/40' onClick={toggleMenu}>
            <div className="h-[2px] w-[30px] bg-[#ccc] shadow-lg"></div>
            <div className="h-[2px] w-[20px] bg-[#ccc] shadow-lg"></div>
            <div className="h-[2px] w-[10px] bg-[#ccc] shadow-lg"></div>
          </button>
        </div>
        <div id='desktop-nav'>
          <nav>
            <ul className='hidden lg:flex items-center justify-center w-full gap-10 p-3'>
              <PageLinks title="Inicio" link='/' clases='!text-2xl text-shadow-gray-300 hover:text-shadow-md transition-all duration-300' />
              <div>
                <li className='flex items-center gap-2 text-2xl text-[#ccc] ml-5 cursor-pointer p-3' onMouseEnter={toggleCategoriasDesktopOn} onMouseLeave={toggleCategoriasDesktopOff}>
                  Categorías
                  <i className="fa-solid fa-chevron-down"></i>
                </li>
              </div>
              <div className='absolute'>
                <ul className='text-[#ccc] flex flex-col hidden absolute bg-[#111] -top-5 mt-8.5 border border-gray-700' ref={categoriasRefDesk}>
                  <CategoriasSlots text="Autos" link="/categorias/autos" onMouseEnter={toggleCategoriasDesktopOn} onMouseLeave={toggleCategoriasDesktopOff} />
                  <CategoriasSlots text="Camionetas" link="/categorias/camionetas" onMouseEnter={toggleCategoriasDesktopOn} onMouseLeave={toggleCategoriasDesktopOff} />
                  <CategoriasSlots text="Motos" link="/categorias/motos" onMouseEnter={toggleCategoriasDesktopOn} onMouseLeave={toggleCategoriasDesktopOff} />
                </ul>
              </div>
              <PageLinks title="Contacto" link='/contacto' clases='!text-2xl text-shadow-gray-300 hover:text-shadow-md transition-all duration-300' />
            </ul>
          </nav>
        </div>
      </header>
      <main className={`my-8 mx-5 text-[#ccc] max-w-7xl min-h-screen`}>
        {children}
      </main>
      <footer className='p-5'>
        <div className='bg-[#111] text-center p-5 text-[#ccc]'>
          &copy; {year} Silvetti Automotores. Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}

export default App