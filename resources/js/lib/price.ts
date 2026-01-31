export const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const rawFormatted = raw ? Number(raw).toLocaleString("es-AR") : "";
    return Number(rawFormatted);
}