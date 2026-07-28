import { Link } from "@inertiajs/react";

interface PageLinksProps {
    title: string,
    link?: string,
    onclick?: () => void,
    metodo?: 'get' | 'post' | 'delete' | 'put' | 'patch' | undefined,
}

export default function PageLinks({ title, link, onclick, metodo }: PageLinksProps) {
    return <li className={`text-[#ccc] pl-5`}>
        <Link method={metodo ?? 'get'} href={link} className="text-xl flex items-center w-fit lg:w-[85%] gap-2 lg:hover:bg-gray-500/20 p-3 lg:transition-background lg:duration-300 rounded-md lg:hover:scale-105 cursor-pointer" onClick={onclick}>
            {title}
        </Link>
    </li>;
}