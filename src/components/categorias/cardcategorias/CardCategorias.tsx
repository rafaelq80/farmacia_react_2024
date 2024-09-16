import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { Pencil, Trash } from "@phosphor-icons/react";

interface CardCategoriaProps {
    categoria: Categoria;
}

function CardCategorias({ categoria }: CardCategoriaProps) {
    
    return (
        <div className='flex flex-col justify-between bg-white border rounded-2xl overflow-hidden'>
            <header className='bg-indigo-800 px-6 py-2 font-bold text-2xl text-white'>
                Categoria
            </header>
            <p className='bg-white p-8 h-full text-3xl'>
                {categoria.grupo}
            </p>
            <div className='flex justify-center items-center gap-2 bg-gradient-to-b from-indigo-800 to-indigo-600 p-2'>
                <Link to={`/editarcategoria/${categoria.id}`} aria-label={`Editar ${categoria.grupo}`}>
                    <Pencil size={28} color="white" className='mr-1 hover:fill-cyan-400' />
                </Link>
                <Link to={`/deletarcategoria/${categoria.id}`} aria-label={`Deletar ${categoria.grupo}`}>
                    <Trash size={28} color="white" className='mr-1 hover:fill-red-400' />
                </Link>
            </div>
        </div>
    );
}

export default CardCategorias;
