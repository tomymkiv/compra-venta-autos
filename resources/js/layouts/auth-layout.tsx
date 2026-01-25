import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
    return <section className='flex flex-col lg:flex-row gap-10 justify-center h-screen items-center w-full lg:mx-0'>
        <div>
            <Link href={route('welcome')}>
                <img className="max-w-2xs lg:max-w-lg" src="/img/logos/logo-fondo-transparent.png" alt="Imagen del logo" />
            </Link>
        </div>
        <div className="max-w-lg w-[90%] lg:w-full">
            <div>
                <h2 className="text-3xl font-semibold text-slate-200 my-3">{title}</h2>
            </div>
            {children}
        </div>
    </section>
}
