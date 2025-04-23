import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <Loader2 className="animate-spin h-12 w-12 text-blue-500 mb-4" />
            <p className="text-gray-700">Cargando sistema...</p>
        </div>
    </div>
);

export default LoadingSpinner;
