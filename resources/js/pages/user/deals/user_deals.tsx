import Pagination from '@/components/pagination';
import { User } from '@/types';
import { PaginatedDealsProps } from '@/types/types';
import { Head, Link, usePage } from '@inertiajs/react'
import AppFront from '@/AppFront';

export default function user_deals({ deal, thisUser }: PaginatedDealsProps) {
    const { user: UserProps } = usePage().props;
    const user = UserProps as User;

    return <AppFront>
        <Head title={`Deals de ${thisUser.name}`} />
        <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col gap-6">
            {/* Header informativo */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Deals de {thisUser.name}</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Historial y estado de las propuestas y tratos de compra/venta.
                    </p>
                </div>
            </div>
            {/* Listado de deals */}
            <div className="flex flex-col gap-4">
                {deal.data && deal.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {deal.data.map((deal) => {
                                const isBuyer = user && deal.buyer_id === user.id;
                                return (
                                    <div
                                        key={deal.id}
                                        className="bg-gray-800 rounded-lg p-5 shadow-lg border border-gray-700/50 flex flex-col justify-between gap-4"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between gap-2 border-b border-gray-700/50 pb-3">
                                                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full">
                                                    {isBuyer ? 'Compra' : 'Venta'}
                                                </span>
                                                {(
                                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${deal.deal_status_id === 1 ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                                        deal.deal_status_id === 2 ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                                            'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                        }`}>
                                                        {deal.deal_status_id === 1 ? 'Aceptado' : deal.deal_status_id === 2 ? 'Rechazado' : 'Pendiente'}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-400">
                                                    {isBuyer ? 'Vendedor: ' : 'Comprador: '}
                                                    <span className="font-semibold text-gray-200">
                                                        {isBuyer ? deal.seller?.name : deal.buyer?.name}
                                                    </span>
                                                </span>
                                                {deal.post && (
                                                    <div className="mt-2 bg-gray-900/50 p-3 rounded-md border border-gray-700/30 flex items-center justify-between gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-semibold text-white">
                                                                {deal.post.car_model?.car_brand?.name} {deal.post.car_model?.name} ({deal.post.anio})
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                {deal.post.currency?.nombre} ${deal.post.precio?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <Link
                                                            href={`/posts/${deal.post.id}`}
                                                            className="text-xs text-amber-400 hover:text-amber-300 transition-colors underline"
                                                        >
                                                            Ver vehículo
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <Pagination links={deal.links} />
                    </>
                ) : (
                    <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700/40 text-gray-400">
                        No hay deals todavía.
                    </div>
                )}
            </div>
        </div>
    </AppFront>
}