interface Props {
    title: string
    mensaje: string,
    deleteButton: boolean
    setShow: (show: boolean) => void
    confirmDelete?: (confirmDelete: boolean) => void
}

export default function PopUp({ deleteButton, title, mensaje, setShow, confirmDelete }: Props) {
    const handleCancel = () => {
        setShow(false);
        confirmDelete && confirmDelete(false);
    }
    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        confirmDelete && confirmDelete(true);
    }
    return <div>
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
                <p className="text-gray-400 mb-4">{mensaje}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleCancel}
                        className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md bg-gray-700 text-white hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    {
                        deleteButton && (
                            <button
                                onClick={handleDelete}
                                className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md bg-red-700 text-white hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
}
