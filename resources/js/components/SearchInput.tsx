import { router } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function SearchInput({ initialQuery = '' }) {
    const [query, setQuery] = useState(initialQuery || '');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        router.get(route('search.index'), {
            q: query,
        }, {
            preserveState: true,
            replace: true,
        });
    };
    return (
        <form onSubmit={submit} className='mx-3'>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar vehículo..."
                className={` ${innerWidth > 1024 ? 'w-full' : 'w-[95%]'} p-3 border rounded-md focus:border-blue-400 outline-none shadow-sm focus:shadow-blue-500 transition-all duration-300`}
            />
        </form>
    );
}
