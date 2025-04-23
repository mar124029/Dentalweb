import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosconfig";
import { useAuth } from "../context/AuthContext";


const useLogin = () => {
    const [formErrors, setFormErrors] = useState({ dni: "", contrasena: "" });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (dni: string, contrasena: string) => {

        try {
            const response = await axiosInstance.post("/api/auth/login", { dni, contrasena });
            if (response.status === 200) {
                login(response.data.token);
                navigate("/home");
                return true;
            } else {
                setError(response.data.message || "Error en las credenciales.");
                return false;
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Error en el servidor.");
            return false;
        }
    };

    return {
        formErrors,
        error,
        handleLogin,
    };
};

export default useLogin;