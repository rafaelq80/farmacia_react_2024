import ListarProdutos from "../../components/produtos/listarprodutos/ListarProdutos"
import ModalProduto from "../../components/produtos/modalprodutos/ModalProduto"

function Home() {
    return (
        <>
            <div className="
                bg-cyan-200 
                flex 
                justify-center
                ">
                <div className='
                    container 
                    grid 
                    grid-cols-2 
                    text-black
                    '>
                    <div className="
                        flex 
                        flex-col 
                        gap-4 
                        items-center 
                        justify-center 
                        py-4
                        ">
                        <h2 className='
                            text-5xl 
                            font-bold
                            '>
                            Seja bem vinde!
                        </h2>
                        <p className='text-2xl'>Medicamento Barato é aqui!</p>

                        <div className="flex justify-around gap-4">
                            <button className='
                                    rounded
                                    bg-cyan-200
                                    text-indigo-900 
                                    py-2 
                                    px-4
                                    '>
                                <ModalProduto />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://ik.imagekit.io/vzr6ryejm/farmacia/home.png?updatedAt=1725625779667"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>
            <ListarProdutos />
        </>
    )
}

export default Home