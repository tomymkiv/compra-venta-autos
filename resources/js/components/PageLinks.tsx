import { Link } from "@inertiajs/react";

interface PageLinksProps {
    title: string,
    link?: string,
    clases?: string,
    onclick?: () => void,
}

export default function PageLinks({ title, link, clases, onclick }: PageLinksProps) {
    return <li className={`text-[#ccc] pl-5 ${clases}`}>
        <Link href={link} className="flex items-center gap-2 p-2" onClick={onclick}>
            {title}
        </Link>
    </li>;
}