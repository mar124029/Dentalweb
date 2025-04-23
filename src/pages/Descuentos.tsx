import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash } from 'lucide-react'
import { toast } from 'sonner'
import Modal from 'react-modal'

Modal.setAppElement("#root")

export default function Descuentos() {
    const [promos, setPromos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingPromo, setEditingPromo] = useState(null)
    const [nuevoMonto, setNuevoMonto] = useState('')
    const [showNewForm, setShowNewForm] = useState(false)
    const [nuevoDescuento, setNuevoDescuento] = useState({
        codigo_valor: '',
        tipo_descuento: '',
        monto_descuento: '',
        fecha_expiracion: '',
    })
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [promoToDelete, setPromoToDelete] = useState(null)


    useEffect(() => {
        fetchPromos()
    }, [])

    const fetchPromos = async () => {
        try {
            setIsLoading(true)
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3001/api/promociones', {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            const data = await response.json()
            setPromos(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error al obtener promociones:', error)
            setPromos([])
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = (promo) => {
        setEditingPromo(promo)
        setNuevoMonto(promo.monto_descuento)
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/promociones/${editingPromo.id_promocion}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ monto_descuento: parseFloat(nuevoMonto) }),
            })

            if (response.ok) {
                toast.success('Descuento actualizado correctamente')
                setEditingPromo(null)
                fetchPromos()
            } else {
                toast.error('Error al actualizar el descuento')
            }
        } catch (error) {
            console.error('Error al actualizar el descuento:', error)
            toast.error('Ocurrió un error inesperado')
        }
    }

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3001/api/promociones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...nuevoDescuento,
                    monto_descuento: parseFloat(nuevoDescuento.monto_descuento),
                }),
            })

            if (response.ok) {
                toast.success('Descuento creado correctamente')
                setShowNewForm(false)
                setNuevoDescuento({ codigo_valor: '', tipo_descuento: '', monto_descuento: '', fecha_expiracion: '' })
                fetchPromos()
            } else {
                toast.error('Error al crear el descuento')
            }
        } catch (error) {
            console.error('Error al crear el descuento:', error)
            toast.error('Ocurrió un error inesperado')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta promoción?")) return;

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:3001/api/promociones/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                toast.success("Promoción eliminada correctamente")
                fetchPromos()
            } else {
                toast.error("Error al eliminar la promoción")
            }
        } catch (error) {
            console.error("Error al eliminar la promoción:", error)
            toast.error("Ocurrió un error inesperado")
        }
    }

    const handleDeleteClick = (id_promocion) => {
        setPromoToDelete(id_promocion)
        setModalIsOpen(true)
    }

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:3001/api/promociones/${promoToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                toast.success('Promoción eliminada correctamente')
                fetchPromos()
            } else {
                toast.error('Error al eliminar la promoción')
            }
        } catch (error) {
            console.error('Error al eliminar la promoción:', error)
            toast.error('Ocurrió un error inesperado')
        } finally {
            setModalIsOpen(false)
            setPromoToDelete(null)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Promociones</h1>
                <button
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                    onClick={() => setShowNewForm(!showNewForm)}
                >
                    <Plus className="w-4 h-4" />
                    Agregar Descuento
                </button>
            </div>

            {isLoading && <div className="text-gray-300">Cargando promociones...</div>}

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-700 bg-gray-800 text-white">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">Código</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Tipo</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Monto</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Expira</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {isLoading ? (
                            [...Array(5)].map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-600 rounded w-1/4"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-600 rounded w-1/4"></div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            promos.map((promo) => (
                                <tr key={promo.id_promocion} className="hover:bg-gray-700 transition-all">
                                    <td className="px-6 py-4">{promo.codigo_valor}</td>
                                    <td className="px-6 py-4">{promo.tipo_descuento}</td>
                                    <td className="px-6 py-4">{promo.monto_descuento}</td>
                                    <td className="px-6 py-4">{new Date(promo.fecha_expiracion).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                className="text-blue-400 hover:text-blue-300"
                                                onClick={() => handleEdit(promo)}
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-red-400 hover:text-red-300"
                                                onClick={() => handleDeleteClick(promo.id_promocion)}
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {editingPromo && (
                <div className="mt-6 text-white bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Editar descuento de {editingPromo.codigo_valor}</h3>
                    <input
                        type="number"
                        value={nuevoMonto}
                        onChange={(e) => setNuevoMonto(e.target.value)}
                        className="bg-gray-700 text-white border border-gray-500 mt-2 p-2 rounded w-full"
                        placeholder="Nuevo monto de descuento"
                    />
                    <div className="mt-4 flex gap-2">
                        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
                            Guardar
                        </button>
                        <button onClick={() => setEditingPromo(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {showNewForm && (
                <div className="mt-6 text-white bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Nuevo Descuento</h3>
                    <div className="grid gap-3 mt-2">
                        <input
                            type="text"
                            placeholder="Código"
                            value={nuevoDescuento.codigo_valor}
                            onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, codigo_valor: e.target.value })}
                            className="bg-gray-700 border border-gray-500 p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Tipo de descuento"
                            value={nuevoDescuento.tipo_descuento}
                            onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, tipo_descuento: e.target.value })}
                            className="bg-gray-700 border border-gray-500 p-2 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Monto"
                            value={nuevoDescuento.monto_descuento}
                            onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, monto_descuento: e.target.value })}
                            className="bg-gray-700 border border-gray-500 p-2 rounded"
                        />
                        <input
                            type="date"
                            value={nuevoDescuento.fecha_expiracion}
                            onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, fecha_expiracion: e.target.value })}
                            className="bg-gray-700 border border-gray-500 p-2 rounded"
                        />
                        <div className="flex gap-2 mt-2">
                            <button onClick={handleCreate} className="bg-green-500 px-4 py-2 rounded text-white">
                                Crear
                            </button>
                            <button
                                onClick={() => {
                                    setShowNewForm(false)
                                    setNuevoDescuento({ codigo_valor: '', tipo_descuento: '', monto_descuento: '', fecha_expiracion: '' })
                                }}
                                className="bg-gray-500 px-4 py-2 rounded text-white"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                overlayClassName="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
                className="bg-white rounded-lg p-6 w-80 shadow-xl outline-none"
            >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">¿Eliminar promoción?</h2>
                <p className="text-sm text-gray-600 mb-6">Esta acción no se puede deshacer. ¿Estás seguro?</p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        onClick={() => setModalIsOpen(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={confirmDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </Modal>

        </div>
    )
}
