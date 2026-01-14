import { Link } from "@inertiajs/react";

interface Props {
    text: string,
    link: string,
    clases?: string,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
}

function CategoriasSlots(props: Props) {
    const { text, link, clases, onMouseEnter, onMouseLeave } = props;
    return <>
        <Link className={`p-5 hover:bg-[#222d] ${clases}`} href={link} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{text}</Link>
    </>;
}

export default CategoriasSlots;