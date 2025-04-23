import { Link } from 'react-router-dom';
import {
    Home,
    Users,
    Percent,
    Bell
} from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white p-4 animate-slide-in fixed top-0 left-0">
            <h2 className="text-lg font-bold mb-6">Menú</h2>
            <nav className="flex flex-col gap-2">
                <MenuItem href="/" icon={Home} label="Inicio" />
                <MenuItem href="/roles" icon={Users} label="Roles" />
                <MenuItem href="/descuentos" icon={Percent} label="Descuentos" />
                <MenuItem href="/notificaciones" icon={Bell} label="Notificaciones" />
            </nav>
        </aside>
    );
}

function MenuItem({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
    return (
        <Link
            to={href}
            className="flex items-center gap-3 p-2 rounded-md transition-all duration-200 hover:bg-gray-700 hover:scale-[1.02]"
        >
            <Icon className="w-5 h-5 transition-colors duration-200 group-hover:text-blue-400" />
            <span className="transition-colors duration-200">{label}</span>
        </Link>
    );
}
