import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
    const [dni, setUsername] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { formErrors, error, handleLogin } = useLogin();
    const [localErrors, setLocalErrors] = useState<{ dni?: string; contrasena?: string }>({});

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const newErrors: { dni?: string; contrasena?: string } = {};
        if (!dni.trim()) newErrors.dni = "Debes ingresar tu usuario.";
        if (!contrasena.trim()) newErrors.contrasena = "Debes ingresar tu contraseña.";

        setLocalErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;
        try {
            await handleLogin(dni, contrasena);
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                console.log("Usuario o contraseña incorrectos.");
            } else {
                console.log("Ocurrió un error al iniciar sesión.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#EDFFFB] flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">¡BIENVENIDO!</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                            Dni
                        </label>
                        <input
                            id="dni"
                            type="text"
                            value={dni}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="dni"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                        {(formErrors.dni || localErrors.dni) && (
                            <p className="text-sm text-red-600 mt-1">
                                {formErrors.dni || localErrors.dni}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="contrasena"
                            type={passwordVisible ? "text" : "contrasena"}
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            autoComplete="current-password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                        <div
                            className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                        </div>
                        {(formErrors.contrasena || localErrors.contrasena) && (
                            <p className="text-sm text-red-600 mt-1">
                                {formErrors.contrasena || localErrors.contrasena}
                            </p>
                        )}
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <div className="text-right">
                        <Link
                            to="/changepassword"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-blue-300 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer"
                    >
                        INGRESAR
                    </button>
                </form>
            </div>
        </div>
    );

}
