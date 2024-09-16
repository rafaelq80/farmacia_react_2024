import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { deletar, listar } from "../../../services/Service";
import { Check, X } from "@phosphor-icons/react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { useAuthStore } from "../../../store/AuthStore";

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
        <div className='mx-auto w-1/3 container'>
            <h1 className='py-4 text-4xl text-center'>Deletar Categoria</h1>
            <p className='mb-4 font-semibold text-center'>
                Você tem certeza de que deseja apagar a categoria a seguir?
            </p>
            <div className='flex flex-col justify-between border rounded-2xl overflow-hidden'>
                <header className='bg-indigo-800 px-6 py-2 font-bold text-2xl text-white'>Categoria</header>
                <p className='bg-white p-8 h-full text-3xl'>{categoria.grupo}</p>
                <div className='flex'>
                    <button className='flex justify-center items-center bg-red-400 hover:bg-red-600 py-2 w-full text-slate-100' onClick={retornar}>
                        <X size={28} color="#ffffff" weight="bold" />
                    </button>
                    <button className='flex justify-center items-center bg-indigo-400 hover:bg-indigo-600 w-full text-slate-100' onClick={deletarCategoria}>
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
