import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="min-h-screen flex bg-[#EDFFFB]">
            {/* Sidebar fijo a la izquierda */}
            <Sidebar />

            {/* Contenido principal */}
            <div className="flex flex-col flex-1 ml-64"> {/* Asegúrate de mover el contenido a la derecha */}
                <Header />
                <main className="flex-1 p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
