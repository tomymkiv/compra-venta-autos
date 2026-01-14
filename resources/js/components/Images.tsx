interface Props {
    src: string,
    alt: string,
    clases?: string,
}

function Images(props: Props) {
    const { src, alt, clases } = props;
    return <img src={src} alt={alt} className={`rounded-xl ${clases}`} />;
}

export default Images;