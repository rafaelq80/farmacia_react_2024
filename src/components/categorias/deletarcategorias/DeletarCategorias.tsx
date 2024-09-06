import { useEffect, useState } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import Categoria from "../../../models/Categoria"
import { deletar, listar } from "../../../services/Service"
import { Check, X } from "@phosphor-icons/react"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarCategoria() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await listar(`/categorias/${id}`, setCategoria)
        } catch (error: any) {
            ToastAlerta('Tema não encontrado!', 'erro')

        }
    }


    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarCategoria() {
        setIsLoading(true)

        try {
            await deletar(`/categorias/${id}`)

            ToastAlerta('Categoria apagada com sucesso', 'sucesso')

        } catch (error) {
            ToastAlerta('Erro ao apagar a categoria', 'erro')
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/categorias")
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center py-4'>Deletar Categoria</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a categoria a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                    Categoria
                </header>
                <p className='p-8 text-3xl bg-white h-full'>{categoria.nome}</p>
                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2 flex items-center justify-center'
                        onClick={retornar}
                    >
                        <X size={28} color="#ffffff" weight="bold"/>
                    </button>
                    <button
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarCategoria}
                    >
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <Check size={28} color="#ffffff" weight="bold" />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarCategoria