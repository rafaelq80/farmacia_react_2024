import { Pencil, Trash } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import Produto from "../../../models/Produto"

interface CardProdutoProps {
  produto: Produto
  //curtir: (id: number) => void
}

function CardProdutos({ produto}: CardProdutoProps) {

  //const { adicionarProduto } = useContext(CartContext)

  return (
    <div className='flex flex-col rounded-lg overflow-hidden justify-between bg-white my-10'>
      <div className="flex justify-end items-end pt-2 pr-2">

        <Link to={`/editarproduto/${produto.id}`}>
          <Pencil size={24} className="mr-1 hover:fill-cyan-600" />
        </Link>

        <Link to={`/deletarproduto/${produto.id}`}>
          <Trash size={24} className="mr-1 hover:fill-red-700" />
        </Link>

        {/* <button onClick={() => { curtir(produto.id) }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="#ff0000"
            viewBox="0 0 256 256"
            className="h-6 w-6 fill-red-600 hover:fill-red-300"
          >
            <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
          </svg>
        </button>
        <p className="pl-1">{produto.curtir}</p> */}
      </div>

      <div className='py-4'>

        <img src={produto.foto} className='mt-1 h-44 max-w-75 mx-auto' alt={produto.nome} />

        <div className='p-4'>
          <p className='text-sm text-center uppercase'>{produto.nome}</p>
          <h3 className='text-xl text-center font-bold uppercase'>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(produto.preco)}
          </h3>
          <p className='text-sm italic text-center'>Categoria: {produto.categoria?.nome}</p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <button className='w-full text-white bg-blue-500 hover:bg-blue-800 flex items-center justify-center py-2'>
          Comprar
        </button>
      </div>
    </div >
  )
}

export default CardProdutos