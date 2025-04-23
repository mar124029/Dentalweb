import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FFFBED]">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">Acceso no autorizado</h1>
                <p className="mb-6">No tienes permiso para acceder a esta página.</p>
                <Link
                    className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
                    to="/"
                >
                    Regresar a la página de inicio
                </Link>
            </div>
        </div>
    );
}

export default Unauthorized;