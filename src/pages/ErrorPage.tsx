import { Link, useRouteError } from "react-router-dom";
import { MoveLeft } from 'lucide-react';
// import { Sidebar } from "../components/Sidebar"; 


export default function ErrorPage() {

    // const [isOpen, setIsOpen] = useState(false);

    const error = useRouteError() as { message?: string };
    console.error(error);

    return (
        <div className={`min-h-screen bg-[#FFFBED]`}>
            {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />  */}
            <div className="lg:pl-16">
                <main className="p-4 lg:p-6">
                    <div className="w-full flex flex-col items-center justify-center gap-y-16">
                        <img src="/assets/404.webp" width={674} alt="Imagen 404" />
                        <p className="text-lg text-red-500">
                            {error?.message || "An unexpected error occurred."}
                        </p>
                        <Link
                            className="flex flex-row gap-x-2 items-center justify-center py-3 px-14 bg-[#E5B323] w-auto rounded-[6px] hover:bg-[#FFD14D]"
                            to={"/"}
                        >
                            <MoveLeft size={26} />
                            <span className="text-lg font-bold">Regresar</span>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
