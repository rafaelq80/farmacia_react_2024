import { ChangeEvent, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';

import { atualizar, cadastrar, listar } from "../../../services/Service";

import Categoria from '../../../models/Categoria';
import Produto from '../../../models/Produto';

function FormProduto() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '', })
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const [categoriaDefault, setCategoriaDefault] = useState<number>(0)
    const [carregandoCategoria, setCarregandoCategoria] = useState<boolean>(true)

    const { id } = useParams<{ id: string }>()

    async function buscarProdutoPorId(id: string) {
        await listar(`/produtos/${id}`, setProduto)
    }

    async function buscarCategoriaPorId(id: string) {
        await listar(`/categorias/${id}`, setCategoria)
    }

    async function buscarCategorias() {
        await listar('/categorias', setCategorias)
    }

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
            setCarregandoCategoria(false)
        }
    }, [produto.categoria])

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria
        })
    }, [categoria])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

        if (categoriaDefault !== null &&
            categoriaDefault !== undefined &&
            categoriaDefault !== 0) {
            buscarCategoriaPorId(categoriaDefault.toString())
        }

        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria
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
                await atualizar(`/produtos`, produto, setProduto);

                alert('Produto atualizado com sucesso')

            } catch (error: any) {
                alert('Erro ao atualizar o Produto')
            }

        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto)

                alert('Produto cadastrado com sucesso');

            } catch (error: any) {
                alert('Erro ao cadastrar a Postagem');
            }
        }

        setIsLoading(false)
        retornar()
    }

    //const carregandoCategoria = categoria.nome === '';
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

                    <input
                        value={produto.preco}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="number"
                        step=".01"
                        // pattern='d\+\.\d\d$'
                        placeholder="Adicione aqui o preço do Produto"
                        name="preco"
                        required
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
                                <option value={categoria.id} selected={categoriaDefault === categoria.id}>{categoria.nome}</option>
                            </>
                        ))}
                    </select>
                </div>
                <button
                    type='submit'
                    disabled={carregandoCategoria}
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