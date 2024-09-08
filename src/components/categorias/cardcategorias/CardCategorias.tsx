import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { Pencil, Trash } from "@phosphor-icons/react";

interface CardCategoriaProps {
    categoria: Categoria;
}

const styles = {
    container: 'border flex flex-col rounded-2xl overflow-hidden justify-between bg-white',
    header: 'py-2 px-6 bg-indigo-800 text-white font-bold text-2xl',
    content: 'p-8 text-3xl bg-white h-full',
    footer: 'bg-gradient-to-b from-indigo-800 to-indigo-600 flex justify-center items-center gap-2 p-2',
    icon: 'mr-1 hover:fill-cyan-400'
};

function CardCategorias({ categoria }: CardCategoriaProps) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                Categoria
            </header>
            <p className={styles.content}>
                {categoria.grupo}
            </p>
            <div className={styles.footer}>
                <Link to={`/editarcategoria/${categoria.id}`} aria-label={`Editar ${categoria.grupo}`}>
                    <Pencil size={28} color="white" className={styles.icon} />
                </Link>
                <Link to={`/deletarcategoria/${categoria.id}`} aria-label={`Deletar ${categoria.grupo}`}>
                    <Trash size={28} color="white" className={`mr-1 hover:fill-red-400`} />
                </Link>
            </div>
        </div>
    );
}

export default CardCategorias;
