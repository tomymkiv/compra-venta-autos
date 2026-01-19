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
                <button onClick={()=> handlePages(link.url)} key={i} dangerouslySetInnerHTML={{ __html: link.label }} className={`px-3.5 py-1 mx-0.5 bg-transparent hover:border-blue-500 active:bg-slate-600 cursor-pointer rounded-md border border-[1px] 
                        ${link.active ? 'border-blue-500 text-blue-500 shadow-blue-400' : ''} `}
                    disabled={!link.url} />
            ))
        }
    </div>
}