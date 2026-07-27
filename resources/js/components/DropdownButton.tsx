interface Props {
    title: string,
    onclick?: () => void,
    onmouseenter?: () => void,
    onmouseleave?: () => void,
}

export default function DropdownButton({ title, onclick, onmouseenter, onmouseleave }: Props) {
    return <li
        onClick={onclick}
        className={`text-[#ccc] pl-5`}>
        <button className={`cursor-pointer text-xl flex items-center lg:w-[85%] gap-2 hover:bg-gray-500/20 p-3 lg:transition-background lg:duration-300 rounded-md hover:scale-105`}
            onMouseEnter={onmouseenter}
            onMouseLeave={onmouseleave}>{title}</button>
    </li>;
}