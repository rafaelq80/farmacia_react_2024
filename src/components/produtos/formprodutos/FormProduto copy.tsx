import { ChangeEvent, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';

import Categoria from '../../../models/Categoria';
import Produto from '../../../models/Produto';
import { atualizar, cadastrar, listar } from "../../../services/Service";
import { useAuthStore } from '../../../store/AuthStore';

function FormularioProduto() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, grupo: '' });
    const [produto, setProduto] = useState<Produto>({} as Produto);

    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useAuthStore()
    const token = usuario.token;

    async function buscarProdutoPorId(id: string) {
        try {
            await listar(`/produtos/${id}`, setProduto, {
                headers: {
                    'Authorization': token,
                },
            });
            // Carregar a categoria do produto ao buscar os detalhes do produto
            if (produto.categoria && produto.categoria.id) {
                await buscarCategoriaPorId(produto.categoria.id.toString());
            }
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    async function buscarCategoriaPorId(id: string) {
        try {
            await listar(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token,
                },
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    async function buscarCategorias() {
        try {
            await listar(`/categorias`, setCategorias, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarCategorias();

        if (id !== undefined) {
            buscarProdutoPorId(id);
        }
    }, [id]);

    useEffect(() => {
        // Atualiza a categoria associada ao produto quando uma nova categoria é selecionada
        if (produto.categoria && produto.categoria.id !== 0) {
            setCategoria(produto.categoria);
        }
    }, [produto]);

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
            categoria_id: categoria.id //Exclusivo do Golang
        });
    }, [categoria]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        let value: any;

        if (e.target.name === 'preco') {
            value = parseFloat(Number(e.target.value).toFixed(2));
        } else {
            value = e.target.value;
        }

        setProduto({
            ...produto,
            [e.target.name]: value,
            categoria: categoria,
            categoria_id: categoria.id, //Exclusivo do Golang
            usuario_id: usuario.id //Exclusivo do Golang
        });
    }

    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Produto atualizado com sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o Produto!');
                }
            }
        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Produto cadastrado com sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o Produto!');
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    // Se categoria.id for diferente de zero
    // isCategoriaPreenchida será true
    const isCategoriaPreenchida = categoria.id !== 0;

    return (
        <div className="flex flex-col items-center mx-auto container">
            <h1 className="my-8 text-4xl text-center">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col gap-4 w-1/2" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Nome do Produto</label>
                    <input
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Insira aqui o nome do Produto"
                        name="nome"
                        required
                        className="border-2 border-slate-700 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="preco">Preço do Produto</label>
                    <input
                        value={produto.preco}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="number"
                        placeholder="Adicione aqui o preço do Produto"
                        name="preco"
                        required
                        className="border-2 border-slate-700 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="foto">Foto do Produto</label>
                    <input
                        value={produto.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Adicione aqui a foto do Produto"
                        name="foto"
                        required
                        className="border-2 border-slate-700 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Categoria do Produto</p>
                    <select
                        name="categoria"
                        id="categoria"
                        className="border-slate-800 p-2 border rounded"
                        value={produto.categoria?.id || ''}
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" disabled>
                            Selecione uma Categoria
                        </option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.grupo}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={!isCategoriaPreenchida || isLoading}
                    className="flex justify-center bg-slate-400 hover:bg-slate-800 disabled:bg-slate-200 mx-auto py-2 rounded w-1/2 font-bold text-white"
                >
                    {isLoading ? (
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    ) : (
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormularioProduto;
