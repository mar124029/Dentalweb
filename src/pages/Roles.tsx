import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { toast } from 'sonner'


export default function Roles() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingUser, setEditingUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:3001/api/auth/usuarios')
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error('Error al obtener los usuarios:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = (user) => {
        setEditingUser(user)
        setSelectedRole(user.id_rol?.toString() || '')
    }

    const handleSave = async () => {
        if (!editingUser || !selectedRole) return

        try {
            const response = await fetch('http://localhost:3001/api/auth/editarol', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_usuario: editingUser.id_usuario,
                    id_rol: parseInt(selectedRole)
                }),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success(`Rol actualizado correctamente para ${editingUser.nombre}`, {
                    className: 'text-lg p-6 rounded-xl max-w-lg',
                    style: {
                        fontSize: '18px',
                        padding: '20px',
                    },
                })
                setEditingUser(null)
                fetchUsers()
            } else {
                toast.error(result.error || 'Error al actualizar el rol')
            }
        } catch (error) {
            console.error('Error al actualizar el rol:', error)
            toast.error('Ocurrió un error inesperado')
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Gestión de Roles</h1>

            {isLoading && (
                <div className="flex items-center gap-2 mb-4 text-gray-300">
                    <svg className="animate-spin h-5 w-5 text-gray-300" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Cargando usuarios...
                </div>
            )}

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-700 bg-gray-800 text-white">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">Nombre</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Rol</th>
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
                                </tr>
                            ))
                        ) : (
                            users.map((user) => (
                                <tr key={user.id_usuario} className="hover:bg-gray-700 transition-all">
                                    <td className="px-6 py-4">{user.nombre} {user.apellido}</td>
                                    <td className="px-6 py-4">{user.correo_electronico}</td>
                                    <td className="px-6 py-4">{user.nombre_rol}</td>
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <button
                                            className="text-blue-400 hover:text-blue-300 transition"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {editingUser && (
                <div className="mt-6 text-white bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Editar rol de {editingUser?.nombre}</h3>
                    <label className="block mt-2">Seleccionar nuevo rol</label>
                    <select
                        className="bg-gray-700 text-white border border-gray-500 mt-1 p-2 rounded"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="1">Admin</option>
                        <option value="2">Paciente</option>
                        <option value="3">Doctor</option>
                        <option value="4">Recepcionista</option>
                    </select>
                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={() => setEditingUser(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
