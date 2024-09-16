import { useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { listar } from "../../../services/Service";
import CardCategorias from "../cardcategorias/CardCategorias";
import { DNA } from "react-loader-spinner";
import { useAuthStore } from "../../../store/AuthStore";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";

function ListarCategorias() {
    
    const navigate = useNavigate();
    
    const { usuario, handleLogout } = useAuthStore();
    const token = usuario.token;

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
            return;
        }

        const buscarCategorias = async () => {
            setIsLoading(true);

            try {
                await listar('/categorias', setCategorias, {
                    headers: { 'Authorization': token }
                });
                
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao carregar categorias!', 'erro');
                }
            } finally {
                setIsLoading(false);
            }
        };

        buscarCategorias();
    }, [token, navigate, handleLogout]);

    return (
        <div className='flex justify-center bg-gray-200'>
            <div className='flex flex-col my-4 container'>
                {isLoading ? (
                    <DNA
                        height="200"
                        width="200"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper mx-auto"
                    />
                ) : categorias.length === 0 ? (
                    <p className='text-center text-gray-500'>Nenhuma categoria encontrada</p>
                ) : (
                    <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {categorias.map((categoria) => (
                            <CardCategorias key={categoria.id} categoria={categoria} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListarCategorias;
