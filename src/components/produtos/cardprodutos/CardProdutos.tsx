import { Pencil, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Produto from "../../../models/Produto";

interface CardProdutoProps {
  produto: Produto;
}


function CardProdutos({ produto }: CardProdutoProps) {

  const precoFormatado = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(produto.preco);

  return (
    <div className='flex flex-col justify-between bg-white my-10 rounded-lg overflow-hidden'>
      <div className='flex justify-end items-end pt-2 pr-2'>
        <Link to={`/editarproduto/${produto.id}`}>
          <Pencil size={24} className='mr-1 hover:fill-cyan-600' />
        </Link>

        <Link to={`/deletarproduto/${produto.id}`}>
          <Trash size={24} className='mr-1 hover:fill-red-700' />
        </Link>
      </div>

      <div className='py-4'>
        <img src={produto.foto} className='mx-auto mt-1 max-w-45 h-40' alt={produto.nome} />
        <div className='p-4'>
          <p className='text-center text-sm uppercase'>{produto.nome}</p>
          <h3 className='font-bold text-center text-xl uppercase'>
            {precoFormatado}
          </h3>
          <p className='text-center text-sm italic'>Categoria: {produto.categoria?.grupo}</p>
        </div>
      </div>
      <div className='flex flex-wrap'>
        <button className='flex justify-center items-center bg-blue-500 hover:bg-blue-800 py-2 w-full text-white'>Comprar</button>
      </div>
    </div>
  );
}

export default CardProdutos;
