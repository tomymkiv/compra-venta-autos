interface Props {
    title: string
    mensaje: string,
    deleteButton: boolean
    setShow: (show: boolean) => void
    confirmDelete?: (confirmDelete: boolean) => void
    confirmation?: (confirmation: boolean) => void
    setExtraState?: (extraState: boolean) => void,
    confirmButtonText?: string
    // cancelButtonText: string
}

export default function PopUp({ setExtraState, deleteButton, title, mensaje, setShow, confirmDelete, confirmation, confirmButtonText }: Props) {
    const handleCancel = () => {
        setShow(false);
        setExtraState && setExtraState(false);
    }
    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        confirmDelete && confirmDelete(true);
    }
    const handleConfirmation = (e: React.FormEvent) => {
        e.preventDefault();
        confirmation && confirmation(true);
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
                    {
                        confirmButtonText &&
                        <button
                            onClick={handleConfirmation}
                            className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md bg-blue-700 text-white hover:bg-blue-600"
                        >
                            {confirmButtonText}
                        </button>
                    }
                </div>
            </div>
        </div>
    </div>
}
