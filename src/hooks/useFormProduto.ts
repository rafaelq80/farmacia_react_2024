import { ChangeEvent, useEffect, useState } from 'react';
import Categoria from '../models/Categoria';
import Produto from '../models/Produto';
import { listar, atualizar, cadastrar } from '../services/Service';
import { useAuthStore } from '../store/AuthStore';
import { ToastAlerta } from '../utils/ToastAlerta';


export function useFormProduto(id: string | undefined, navigate: any) {
    const { usuario, handleLogout } = useAuthStore();
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, grupo: '' });
    const [produto, setProduto] = useState<Produto>({} as Produto);
    const [categoriaDefault, setCategoriaDefault] = useState<number>(0);
    const [isCategoria, setIsCategoria] = useState<boolean>(true);

    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await listar('/categorias', setCategorias, {
                    headers: { 'Authorization': token }
                });
                if (id) {
                    await listar(`/produtos/${id}`, setProduto, {
                        headers: { 'Authorization': token }
                    });
                    if (produto.categoria?.id) {
                        setCategoriaDefault(produto.categoria.id);
                        setIsCategoria(false);
                    }
                }
            } catch (error: any) {
                handleError(error);
            }
        };
        fetchData();
    }, [id, token]);

    useEffect(() => {
        setProduto(prevProduto => ({
            ...prevProduto,
            categoria,
            categoria_id: categoria.id,
            usuario_id: usuario.id
        }));
    }, [categoria, usuario.id]);

    const handleError = (error: any) => {
        if (error.toString().includes('401')) {
            handleLogout();
        } else {
            ToastAlerta('Erro ao processar a solicitação!', 'erro');
        }
    };

    const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedValue = name === "preco" ? parseFloat(Number(value).toFixed(2)) : value;
        setProduto(prevProduto => ({
            ...prevProduto,
            [name]: updatedValue,
            categoria,
            categoria_id: categoria.id,
            usuario_id: usuario.id
        }));
        if (name === "categoria" && categoriaDefault) {
            buscarCategoriaPorId(categoriaDefault.toString());
        }
    };

    const buscarCategoriaPorId = async (id: string) => {
        try {
            await listar(`/categorias/${id}`, setCategoria, {
                headers: { 'Authorization': token }
            });
        } catch (error: any) {
            handleError(error);
        }
    };

    const gerarNovoProduto = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (id) {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('Produto atualizado com sucesso', 'sucesso');
            } else {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('Produto cadastrado com sucesso', 'sucesso');
            }
        } catch (error: any) {
            handleError(error);
        } finally {
            setIsLoading(false);
            navigate('/produtos');
        }
    };

    return {
        isLoading,
        categorias,
        produto,
        categoriaDefault,
        isCategoria,
        atualizarEstado,
        gerarNovoProduto,
        buscarCategoriaPorId
    };
}
