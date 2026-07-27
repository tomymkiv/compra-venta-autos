interface SearchProps {
    enviarData: (e: React.FormEvent) => void,
    setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void,
    initialQuery: string | undefined,
}

export default function SearchInput({ enviarData, setQuery, initialQuery }: SearchProps) {
    return (
        <form onSubmit={enviarData} className='mx-3'>
            <input
                type="text"
                value={initialQuery}
                onChange={setQuery}
                placeholder="Buscar vehículo..."
                className={`w-full p-3 border rounded-md focus:border-blue-400 outline-none shadow-sm focus:shadow-blue-500 transition-all duration-300`}
            />
        </form>
    );
}