import Pagination from '@/components/pagination';
import { User } from '@/types';
import { PaginatedDealsProps } from '@/types/types';
import { Head, Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppFront from '@/AppFront';
import ButtonPrimary from '@/components/ui/ButtonPrimary';
import usePopUp from '@/hooks/use-popup';
import PopUp from '@/components/PopUp';

export default function index({ deal, post }: PaginatedDealsProps) {
    console.log()
    const { user: UserProps } = usePage().props;
    const { show, setShow, confirmation, setConfirmation, confirmDelete, setConfirmDelete } = usePopUp();
    const [dealAccepted, setDealAccepted] = useState<boolean>(false);
    const [forceDelete, setForceDelete] = useState<boolean>(false);
    const [accepted, setAccepted] = useState<boolean>(false);
    const [dealId, setDealId] = useState<number | null>(null);
    const user = UserProps as User;

    const handleDeal = async (e: React.FormEvent, deal_id: number) => {
        e.preventDefault();
        setShow(true);
        setDealId(deal_id);
    }
    const readStatuses = () => {
        deal.data.map(d => {
            if (d.deal_status_id === 1) {
                setDealAccepted(true);
                return;
            }
        })
    }
    useEffect(() => {
        readStatuses();
        if (confirmation) {
            deal.data.map(d => {// para rechazarlo (previo a la eliminación)
                if (d.id === dealId && d.seller.id === user.id && !accepted) {
                    router.patch(route('deals.update_status', { deal: dealId }), {}, {
                        onSuccess: () => {
                            setConfirmation(false);
                            setShow(false);
                        },
                        onError: () => {
                            setConfirmation(false);
                            setShow(false);
                        }
                    });
                } else if (accepted) {
                    router.patch(route('deals.accept', { deal: dealId }), {}, {
                        onSuccess: () => {
                            setConfirmation(false);
                            setShow(false);
                        },
                        onError: () => {
                            setConfirmation(false);
                            setShow(false);
                        }
                    });
                }
            })
        } else if (confirmDelete) { // para eliminarlo
            deal.data.map(d => {
                if (d.id === dealId && d.seller.id === user.id) {
                    router.delete(route('deals.destroy_as_seller', { deal: dealId }), {
                        onSuccess: () => {
                            setConfirmation(false);
                            setForceDelete(false);
                            setShow(false);
                        },
                        onError: () => {
                            setConfirmation(false);
                            setForceDelete(false);
                            setShow(false);
                        }
                    });
                }
            })
        }
    }, [confirmation, confirmDelete, accepted])
    return <AppFront>
        <Head title="Mis Deals" />
        <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col gap-6">
            {/* Header informativo */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Mis Deals</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Historial y estado de tratos de compra/venta.
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
                                            <div className='flex gap-8'>
                                                <form className='flex flex-col lg:flex-row gap-2 justify-center items-center w-full' onSubmit={(e) => handleDeal(e, deal.id)}>
                                                    {dealAccepted ? (
                                                        deal.deal_status_id === 1 ? (
                                                            <p className='text-green-500 text-md'>Deal aceptado</p>
                                                        ) : dealAccepted && (
                                                            <ButtonPrimary type='submit' onClick={() => { setForceDelete(true); setAccepted(false); }} className='!bg-red-700 hover:!bg-red-500 !border-red-700' text='Eliminar Deal' />
                                                        )
                                                    ) : (
                                                        deal.deal_status_id === 2 ? (
                                                            <ButtonPrimary onClick={() => { setForceDelete(true); setAccepted(false); }} type='submit' className='!bg-red-700 hover:!bg-red-500 !border-red-700' text='Eliminar Deal' />
                                                        ) : (
                                                            <>
                                                                <ButtonPrimary onClick={() => setAccepted(false)} type='submit' className='!bg-red-700 hover:!bg-red-500 !border-red-700' text='Rechazar' />
                                                                <ButtonPrimary onClick={() => setAccepted(true)} type='submit' className='!bg-green-700 hover:!bg-green-500 !border-green-700' text='Aceptar' />
                                                            </>
                                                        )
                                                    )}
                                                    {
                                                        show && accepted && ( // aceptar
                                                            <PopUp deleteButton={false} setShow={setShow} title='Aceptar Deal' mensaje='Al aceptar este deal, no podrás aceptar otro para este vehiculo.' confirmation={setConfirmation} confirmButtonText='Confirmar aceptación' />
                                                        )
                                                    }
                                                    {
                                                        show && !accepted && !forceDelete && ( // rechazar
                                                            <PopUp deleteButton={false} setShow={setShow} title='Rechazar Deal' mensaje='Al rechazar este deal, no podrás aceptarlo más.' confirmation={setConfirmation} confirmButtonText='Confirmar rechazo' />
                                                        )
                                                    }
                                                    {
                                                        // eliminar
                                                        (show && !accepted && deal.deal_status_id === 2) || (forceDelete) && (
                                                            <PopUp deleteButton={true} setShow={setShow} title='Eliminar Deal' mensaje='¿Estás seguro que quieres eliminar definitivamente este Deal?'
                                                                confirmDelete={setConfirmDelete} setExtraState={setForceDelete}
                                                            />
                                                        )
                                                    }
                                                </form>
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
