interface Props {
    clases: string,
    title: string,
    onclick?: () => void,
    onmouseenter?: () => void,
    onmouseleave?: () => void,
}

export default function DropdownButton({ clases, title, onclick, onmouseenter, onmouseleave }: Props) {
    return <button className={`cursor-pointer text-2xl ${clases}`} 
    onClick={onclick} 
    onMouseEnter={onmouseenter} 
    onMouseLeave={onmouseleave}>{title}</button>;
}