import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { deletar, listar } from "../../../services/Service";
import { Check, X } from "@phosphor-icons/react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { useAuthStore } from "../../../store/AuthStore";

// Estilos separados em um objeto
const styles = {
    container: "container w-1/3 mx-auto",
    title: "text-4xl text-center py-4",
    description: "text-center font-semibold mb-4",
    categoryContainer: "border flex flex-col rounded-2xl overflow-hidden justify-between",
    header: "py-2 px-6 bg-indigo-800 text-white font-bold text-2xl",
    categoryName: "p-8 text-3xl bg-white h-full",
    buttonContainer: "flex",
    cancelButton: "text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2 flex items-center justify-center",
    confirmButton: "w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center",
};

function DeletarCategoria() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const token = usuario.token;

    // Função auxiliar para headers
    const headers = {
        Authorization: token,
    };

    useEffect(() => {
        if (!token) {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
            return;
        }

        if (id) {
            buscarPorId(id);
        }
    }, [token, id]);

    // Função para buscar a categoria pelo ID
    async function buscarPorId(id: string) {
        try {
            await listar(`/categorias/${id}`, setCategoria, { headers });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            } else {
                ToastAlerta("Categoria não encontrada!", "erro");
            }
        }
    }

    // Função para deletar a categoria
    async function deletarCategoria() {
        setIsLoading(true);
        try {
            await deletar(`/categorias/${id}`, { headers });
            ToastAlerta("Categoria apagada com sucesso", "sucesso");
            retornar();
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            } else {
                ToastAlerta("Erro ao apagar a categoria", "erro");
            }
        } finally {
            setIsLoading(false);
        }
    }

    function retornar() {
        navigate("/categorias");
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Deletar Categoria</h1>
            <p className={styles.description}>
                Você tem certeza de que deseja apagar a categoria a seguir?
            </p>
            <div className={styles.categoryContainer}>
                <header className={styles.header}>Categoria</header>
                <p className={styles.categoryName}>{categoria.grupo}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton} onClick={retornar}>
                        <X size={28} color="#ffffff" weight="bold" />
                    </button>
                    <button className={styles.confirmButton} onClick={deletarCategoria}>
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            <Check size={28} color="#ffffff" weight="bold" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarCategoria;
