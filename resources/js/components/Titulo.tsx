interface Props {
    titulo: string,
    clases?: string,
}


function Titulo(props: Props) {
    const { titulo, clases } = props;

    return <h2 className={'text-3xl md:text-left mb-10 text-[#ccc] ' + clases}>{titulo}</h2>;
}

export default Titulo;