import { ChangeEvent, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';

import { atualizar, cadastrar, listar } from "../../../services/Service";

import Categoria from '../../../models/Categoria';
import Produto from '../../../models/Produto';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { useAuthStore } from '../../../store/AuthStore';
import { NumericFormat } from 'react-number-format';

function FormProduto() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [categoria, setCategoria] = useState<Categoria>({ id: 0, grupo: '', })
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const [categoriaDefault, setCategoriaDefault] = useState<number>(0)
    const [isCategoria, setIsCategoria] = useState<boolean>(true)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useAuthStore();
    const token = usuario.token

    async function buscarProdutoPorId(id: string) {
        try {
            await listar(`/produtos/${id}`, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Produto não Encontrado!', 'erro')
                retornar();
            }
        }
    }

    async function buscarCategoriaPorId(id: string) {
        try {
            await listar(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Categoria não Encontrada!', 'erro')
                retornar();
            }
        }
    }

    async function buscarCategorias() {
        try {
            await listar('/categorias', setCategorias, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarCategorias()

        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])

    useEffect(() => {

        if (produto.categoria?.id !== null &&
            produto.categoria?.id !== undefined &&
            produto.categoria?.id > 0) {
            setCategoriaDefault(produto.categoria!.id)
            setIsCategoria(false)
        }

    }, [produto.categoria, produto.preco])

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
            categoria_id: categoria.id //Exclusivo do Golang
        })
    }, [categoria])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

        let value: any;

        if (e.target.name === "preco") {
            value = parseFloat(Number(e.target.value).toFixed(2))
        } else {
            value = e.target.value
        }

        if (categoriaDefault !== null &&
            categoriaDefault !== undefined &&
            categoriaDefault !== 0) {
            buscarCategoriaPorId(categoriaDefault.toString())
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
        e.preventDefault()
        setIsLoading(true)

        if (id != undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: {
                        'Authorization': token
                    }
                });

                ToastAlerta('Produto atualizado com sucesso', 'sucesso')

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar o Produto', 'erro')
                }
            }

        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: {
                        'Authorization': token
                    }
                })

                ToastAlerta('Produto cadastrado com sucesso', 'sucesso');

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar a Postagem', 'erro');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    console.log(JSON.stringify(produto))

    return (

        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Nome do Produto</label>
                    <input
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Insira aqui o nome do Produto"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Preço do Produto</label>

                    <NumericFormat
                        name="preco"
                        required
                        placeholder={"Adicione aqui o preço do Produto"}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        value={produto.preco}
                        thousandSeparator={true}
                        decimalSeparator='.'
                        decimalScale={2}
                        fixedDecimalScale
                        allowLeadingZeros
                        className="border-2 border-slate-700 rounded p-2"
                    />

                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Foto do Produto</label>

                    <input
                        value={produto.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Adicione aqui a foto do Produto"
                        name="foto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Categoria do Produto</p>
                    <select name="categoria" id="categoria" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione uma Categoria</option>
                        {categorias.map((categoria) => (
                            <>
                                <option value={categoria.id} selected={categoriaDefault === categoria.id}>{categoria.grupo}</option>
                            </>
                        ))}
                    </select>
                </div>
                <button
                    type='submit'
                    disabled={isCategoria}
                    className='flex justify-center rounded disabled:bg-slate-200 bg-indigo-400 
                            hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2'
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }
                </button>
            </form>
        </div>
    )

}

export default FormProduto;