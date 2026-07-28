import { useEffect, useRef, useState } from 'react'
import PageLinks from './components/PageLinks'
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js'
import { AppComponentProps } from './types/types';
import CategoriasSlots from './components/CategoriasSlots';
import DropdownButton from './components/DropdownButton';
import SearchInput from './components/SearchInput';
import { usePage } from '@inertiajs/react';
import { User } from './types';
import NavButtonLines from './components/ui/nav-button-lines';
import UserAvatar from './components/UserAvatar';

export default function AppFront({ children, initialQuery, hero }: AppComponentProps) {
  const {
    user: UserProps,
    my_user_role: UserRoleProp
  } = usePage().props;
  const user = UserProps as User;
  const my_user_role = UserRoleProp as string;
  const categoriasRefMob = useRef<HTMLUListElement>(null!)
  const menuRef = useRef<HTMLUListElement>(null!) // esto sirve para referenciar el ul del menu explicitamente. 
  // el ! al final es para que no tire error de q puede ser nulo
  const year = new Date().getFullYear();
  const [menuWidthClass, setMenuWidthClass] = useState('w-0');

  useEffect(() => {
    setMenuWidthClass(window.innerWidth > 920 ? 'w-0' : 'w-full');
  }, []);

  const toggleMenu = () => {
    if (window.innerWidth < 1024) {
      setMenuWidthClass(prev => prev === 'w-0' ? 'w-full' : 'w-0');
    }
    else if (innerWidth > 1024 && innerWidth <= 1200) {
      setMenuWidthClass(prev => prev === 'w-0' ? 'w-[30%]' : 'w-0');
    }
    else if (innerWidth > 1200) {
      setMenuWidthClass(prev => prev === 'w-0' ? 'w-[20%]' : 'w-0');
    }
  }
  const toggleCategoriasMobile = () => {
    categoriasRefMob.current.classList.toggle('hidden');
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

    if (window.innerWidth < 1024) {
      setMenuWidthClass(prev => prev !== 'w-0' ? 'w-0' : 'w-[20%]');
    }

    router.get(route('search.index'), {
      q: query,
    }, {
      preserveState: true,
      replace: true,
    });
  };
  return (
    <>
      <header className={`relative z-50 flex items-center justify-center bg-[#111b] sticky top-0 w-full`}>
        <div id='mobile-nav'>
          <nav className='bg-[#111]'>
            <ul ref={menuRef} id='menu' className={`flex flex-col gap-10 justify-center overflow-hidden fixed left-0 bg-[#2227] backdrop-blur-sm transition-[width] duration-350 ease-in-out ${menuWidthClass} h-screen z-50`}>
              {
                user &&
                <>
                  <UserAvatar center={true} name={user.name} avatar={user.avatar && user.avatar || ""} userId={user.id} role={my_user_role.toLowerCase()} />
                </>
              }
              <PageLinks title="Inicio" link='/' />
              {
                my_user_role === 'SUPER_USER' &&
                <PageLinks title="Administración" link='/admin' />
              }
              <DropdownButton title="Publicaciones" onclick={toggleCategoriasMobile} />
              <ul className='text-[#ccc] flex flex-col ml-5 hidden' ref={categoriasRefMob}>
                <CategoriasSlots text="Ver publicaciones" link="/posts" clases='w-[85%]' />
                {user && (my_user_role === 'VENDEDOR' || my_user_role === 'SUPER_USER') &&
                  <>
                    <CategoriasSlots text="Crear publicación" link="/posts/create" clases='w-[85%]' />
                    <CategoriasSlots text="Editar publicación" link={`/posts/user/${user.id}`} clases='w-[85%]' />
                  </>
                }
              </ul>
              {
                user ?
                  <PageLinks title="Cerrar sesión" link={'/logout'} metodo={'delete'} onclick={handleLogout} />
                  : <PageLinks title="Iniciar sesión" link='/login' />
              }
              <SearchInput enviarData={(e: React.FormEvent) => submit(e)} setQuery={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} initialQuery={query} />
            </ul>
          </nav>
          <button className='fixed top-0 left-0 z-50 flex flex-col gap-1 p-5 bg-[#2228] outline outline-gray-200/40 cursor-pointer' onMouseEnter={toggleMenu}>
            <NavButtonLines />
            <NavButtonLines />
            <NavButtonLines />
          </button>
        </div>
      </header>
      {/* imagen principal, donde está la información principal */}
      {hero && (
        <div className="relative w-full z-10">
          {hero}
        </div>
      )}
      <main className={`${innerWidth < 768 ? 'py-16' : ''} pt-40 relative bg-[#111] z-20 text-[#ccc] min-h-screen flex items-center justify-center`}>
        {/* Transición suave desde el hero hacia abajo */}
        {/* <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#111] to-transparent z-30 pointer-events-none" /> */}
        <section className='max-w-7xl bg-[#111] px-5 flex items-center justify-center w-full'>
          {children}
        </section>
      </main>
      <footer>
        <div className='relative z-40 bg-[#111] text-center p-5 py-8 text-[#ccc]'>
          &copy; {year} Silvetti Automotores. Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}