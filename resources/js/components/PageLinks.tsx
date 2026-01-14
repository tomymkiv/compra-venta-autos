import { Link } from "@inertiajs/react";

interface PageLinksProps {
    title: string,
    link: string,
    clases?: string,
    children?: React.ReactNode,
    onclick?: () => void,
}

export default function PageLinks(props: PageLinksProps) {
    const { title, link, clases, children, onclick } = props;
    return <>
        <li className={`text-[#ccc] pl-5 text-3xl ${clases}`}>
            <Link href={link} className="flex items-center gap-2 p-2" onClick={onclick}>
                {title}
                {children}
            </Link>
        </li>
    </>;
}