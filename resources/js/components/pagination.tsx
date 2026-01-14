import { PaginationLink } from "@/types/automovil";
import { router } from "@inertiajs/react";

export default function Pagination({ links }: { links: PaginationLink[] }) {
    const handlePages = (url: string | null) => {
        // si existe una url, me redirige hacia el parámetro que requiere.
        url ? router.visit(url) : '';
    }

    return <div className="flex flex-wrap items-center space-x-1 mt-4">
        {
            links.map((link, i) => (
                <button onClick={()=> handlePages(link.url)} key={i} dangerouslySetInnerHTML={{ __html: link.label }} className={`px-3.5 py-1 mx-0.5 bg-slate-800 hover:bg-slate-500 active:bg-slate-600 cursor-pointer rounded-md border border-gray-800 
                        ${link.active ? '!bg-gray-900' : ''} `}
                    disabled={!link.url} />
            ))
        }
    </div>
}