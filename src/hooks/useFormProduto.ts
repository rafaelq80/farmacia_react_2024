import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../models/Categoria';
import Produto from '../models/Produto';
import { listar, atualizar, cadastrar } from '../services/Service';
import { useAuthStore } from '../store/AuthStore';

export function useFormProduto() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, grupo: '' });
    const [produto, setProduto] = useState<Produto>({} as Produto);

    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useAuthStore();
    const token = usuario.token;

    const handleAuthError = (error: any) => {
        if (error.toString().includes('401')) 
            handleLogout();
    };


    async function buscarProdutoPorId(id: string) {
        try {
            await listar(`/produtos/${id}`, setProduto, {
                headers: { 'Authorization': token },
            });

            // Aqui garantimos que a categoria é buscada depois do produto ser definido
            if (produto.categoria?.id) {
                await buscarCategoriaPorId(produto.categoria.id.toString());
            }

        } catch (error: any) {
            handleAuthError(error);
        }
    }

    async function buscarCategoriaPorId(id: string) {
        try {
            await listar(`/categorias/${id}`, setCategoria, {
                headers: { 'Authorization': token },
            });
        } catch (error: any) {
            handleAuthError(error);
        }
    }

    async function buscarCategorias() {
        try {
            await listar(`/categorias`, setCategorias, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            handleAuthError(error);
        }
    }

    useEffect(() => {
        if (!token) {
            alert('Você precisa estar logado!');
            navigate('/');
        } else {
            buscarCategorias();
            if (id) {
                buscarProdutoPorId(id);
            }
        }
    }, [id, token]);

    // Sincronizar o estado da categoria ao produto
    useEffect(() => {
        if (produto.categoria) {
            setCategoria(produto.categoria);
        }
    }, [produto.categoria]);

    // Atualizar o produto com a nova categoria
    useEffect(() => {
        if (categoria.id !== 0) {
            setProduto((prevProduto) => ({
                ...prevProduto,
                categoria: categoria,
                categoria_id: categoria.id, // Exclusivo do Golang
            }));
        }
    }, [categoria]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        
        const { name, value } = e.target;

        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: name === 'preco' ? parseFloat(Number(value).toFixed(2)) : value,
            categoria: categoria,
            categoria_id: categoria.id, // Exclusivo do Golang
            usuario_id: usuario.id // Exclusivo do Golang
        }));
    }

    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id) {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: { Authorization: token },
                });
                alert('Produto atualizado com sucesso');
            } else {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: { Authorization: token },
                });
                alert('Produto cadastrado com sucesso');
            }
        } catch (error: any) {
            handleAuthError(error);
            alert(`Erro ao ${id ? 'Atualizar' : 'Cadastrar'} o Produto!`);
        } finally {
            setIsLoading(false);
            retornar();
        }
    }

    const isCategoriaPreenchida = categoria.id !== 0;

    return {
        produto,
        categorias,
        categoria,
        isLoading,
        isCategoriaPreenchida,
        atualizarEstado,
        gerarNovoProduto,
        buscarCategoriaPorId
    };
}
