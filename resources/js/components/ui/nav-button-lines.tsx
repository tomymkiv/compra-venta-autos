interface Props {
    width: string,
}

export default function NavButtonLines({ width }: Props) {
    return <div className={`h-[2px] w-[${width}] bg-[#ccc] shadow-lg`}></div>
}