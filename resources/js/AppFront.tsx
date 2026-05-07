import { useRef, useState } from 'react'
import PageLinks from './components/PageLinks'
import { Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js'
import { AppComponentProps } from './types/types';
import CategoriasSlots from './components/CategoriasSlots';
import DropdownButton from './components/DropdownButton';
import SearchInput from './components/SearchInput';

export default function AppFront({ loguedUser, children, initialQuery }: AppComponentProps) {
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

  const handleLogout = () => {
    router.delete(route('logout'));
  };

  /**
   * el siguiente codigo pertenece únicamente al buscador.
   */

  const [query, setQuery] = useState(initialQuery || '');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    innerWidth < 1024 && menuRef.current.classList.toggle('w-screen')

    router.get(route('search.index'), {
      q: query,
    }, {
      preserveState: true,
      replace: true,
    });
  };
  return (
    <>
      <header className={`relative z-30 flex items-center justify-center bg-[#111b] sticky top-0 w-full`}>
        <div id='mobile-nav' className='lg:hidden'>
          <nav className='bg-[#111]'>
            <ul ref={menuRef} id='menu' className='flex flex-col gap-10 justify-center overflow-hidden fixed left-0 bg-[#1117] backdrop-blur-sm transition-[width] duration-350 ease-in-out w-0 h-screen z-50'>
              {
                loguedUser &&
                <Link href={route('user.show', loguedUser.id)} className='w-fit p-5 flex items-center gap-2 flex-col'>
                  <img src={loguedUser.avatar?.includes('api') ? loguedUser.avatar : `/storage/${loguedUser.avatar}`} className="rounded-full w-20 h-20 object-cover" alt={"Imagen del usuario"} />
                  <p className='text-xl text-[#ccc]'>{loguedUser.name}</p>
                </Link>
              }
              <PageLinks title="Inicio" link='/' clases='!text-xl' />
              <DropdownButton title="Publicaciones" onclick={toggleCategoriasMobile} clases='!text-xl text-[#ccc] pl-7 flex items-center gap-2 p-2' />
              <ul className='text-[#ccc] flex flex-col ml-5 hidden' ref={categoriasRefMob}>
                <CategoriasSlots text="Ver publicaciones" link="/posts" clases='w-[85%]' />
                <CategoriasSlots text="Crear publicación" link="/posts/create" clases='w-[85%]' />
                {loguedUser && <CategoriasSlots text="Editar publicación" link={`/posts/user/${loguedUser?.id}`} clases='w-[85%]' />}
              </ul>
              {
                loguedUser ?
                  <li className='text-[#ccc] pl-5 text-xl'>
                    <button title="Cerrar sesión" className='flex items-center gap-2 p-2 cursor-pointer' onClick={handleLogout} >Cerrar sesión</button>
                  </li>
                  : <PageLinks title="Iniciar sesión" link='/login' clases='!text-xl' />
              }
              <SearchInput enviarData={(e: React.FormEvent) => submit(e)} setQuery={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} initialQuery={query} />
            </ul>
          </nav>
          <button className='fixed top-0 left-0 z-50 flex flex-col gap-1 p-5 bg-[#2228] outline outline-gray-200/40' onClick={toggleMenu}>
            <div className="h-[2px] w-[30px] bg-[#ccc] shadow-lg"></div>
            <div className="h-[2px] w-[20px] bg-[#ccc] shadow-lg"></div>
            <div className="h-[2px] w-[10px] bg-[#ccc] shadow-lg"></div>
          </button>
        </div>
        <div id='desktop-nav' className='w-full'>
          <nav>
            <ul className='hidden lg:flex items-center justify-evenly w-full gap-10 p-3'>
              <div className='flex gap-5'>
                {
                  loguedUser &&
                  <Link href={route('user.show', loguedUser.id)} className='w-fit flex items-center justify-center flex-col gap-2'>
                    <img src={loguedUser.avatar?.includes('api') ? loguedUser.avatar : `/storage/${loguedUser.avatar}`} className="rounded-full w-15 h-15 object-cover" alt={"Imagen del usuario"} />
                    <p>{loguedUser.name}</p>
                  </Link>
                }
              </div>
              <div className='flex gap-5'>
                <PageLinks title="Inicio" link='/' clases='flex items-center gap-2 p-2 cursor-pointer text-xl text-shadow-gray-300 hover:text-shadow-md transition-all duration-300' />
                <div>
                  <DropdownButton clases='text-xl text-[#ccc] ml-5 cursor-pointer p-4' onmouseenter={toggleCategoriasDesktopOn} onmouseleave={toggleCategoriasDesktopOff} title='Publicaciones' />
                </div>
                <div className='absolute'>
                  <ul className='text-[#ccc] flex flex-col hidden absolute bg-[#111] top-1.5 left-40 mt-8.5 border border-gray-700' ref={categoriasRefDesk}>
                    <CategoriasSlots text="Ver publicaciones" clases='w-fit' link="/posts" onMouseEnter={toggleCategoriasDesktopOn} onMouseLeave={toggleCategoriasDesktopOff} />
                    <CategoriasSlots text="Crear publicación" clases='w-fit' link="/posts/create" onMouseEnter={toggleCategoriasDesktopOn} onMouseLeave={toggleCategoriasDesktopOff} />
                    {
                      loguedUser &&
                      <CategoriasSlots text="Editar publicación" clases='w-fit' link={`/posts/user/${loguedUser?.id}`} onMouseEnter={toggleCategoriasDesktopOn} onMouseLeave={toggleCategoriasDesktopOff} />
                    }
                  </ul>
                </div>
                <SearchInput enviarData={(e: React.FormEvent) => submit(e)} setQuery={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} initialQuery={query} />
              </div>
              {
                loguedUser ?
                  <li className='text-[#ccc] pl-5'>
                    <button className='flex items-center gap-2 p-2 cursor-pointer text-xl text-shadow-gray-300 hover:text-shadow-md transition-all duration-300' onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                  : <PageLinks title="Iniciar sesión" link='/login' clases='flex items-center gap-2 p-2 cursor-pointer text-xl text-shadow-gray-300 hover:text-shadow-md transition-all duration-300' />
              }
            </ul>
          </nav>
        </div>
      </header>
      <main className={`${innerWidth < 550 ? 'my-16' : 'my-10'} mx-5 text-[#ccc] min-h-screen flex items-center justify-center`}>
        <section className='max-w-7xl flex items-center justify-center w-full'>
          {children}
        </section>
      </main>
      <footer>
        <div className='bg-[#111] text-center p-5 text-[#ccc]'>
          &copy; {year} Silvetti Automotores. Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}