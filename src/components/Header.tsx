import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

// Importante: vincula el modal al elemento raíz
Modal.setAppElement("#root");

export default function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-200">
                <div className="text-xl font-semibold text-gray-800">Panel de Administración</div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">Hola, Admin</span>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                            onClick={() => setModalIsOpen(true)}
                        >
                            <LogOut className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </header>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                overlayClassName="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
                className="bg-white rounded-lg p-6 w-80 shadow-xl outline-none"
            >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">¿Cerrar sesión?</h2>
                <p className="text-sm text-gray-600 mb-6">¿Estás seguro de que quieres cerrar sesión?</p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        onClick={() => setModalIsOpen(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </Modal>
        </>
    );
}
