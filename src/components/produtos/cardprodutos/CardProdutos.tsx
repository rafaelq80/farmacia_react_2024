import { Pencil, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Produto from "../../../models/Produto";

interface CardProdutoProps {
  produto: Produto;
}

const styles = {
  cardContainer: "flex flex-col rounded-lg overflow-hidden justify-between bg-white my-10",
  actionContainer: "flex justify-end items-end pt-2 pr-2",
  iconLink: "mr-1",
  iconEdit: "hover:fill-cyan-600",
  iconDelete: "hover:fill-red-700",
  imageContainer: "py-4",
  productImage: "mt-1 h-40 max-w-45 mx-auto",
  productInfo: "p-4",
  productName: "text-sm text-center uppercase",
  productPrice: "text-xl text-center font-bold uppercase",
  productCategory: "text-sm italic text-center",
  buttonContainer: "flex flex-wrap",
  buyButton: "w-full text-white bg-blue-500 hover:bg-blue-800 flex items-center justify-center py-2",
};

function CardProdutos({ produto }: CardProdutoProps) {

  const precoFormatado = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(produto.preco);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.actionContainer}>
        <Link to={`/editarproduto/${produto.id}`}>
          <Pencil size={24} className={`${styles.iconLink} ${styles.iconEdit}`} />
        </Link>

        <Link to={`/deletarproduto/${produto.id}`}>
          <Trash size={24} className={`${styles.iconLink} ${styles.iconDelete}`} />
        </Link>
      </div>

      <div className={styles.imageContainer}>
        <img src={produto.foto} className={styles.productImage} alt={produto.nome} />
        <div className={styles.productInfo}>
          <p className={styles.productName}>{produto.nome}</p>
          <h3 className={styles.productPrice}>
            {precoFormatado}
          </h3>
          <p className={styles.productCategory}>Categoria: {produto.categoria?.grupo}</p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buyButton}>Comprar</button>
      </div>
    </div>
  );
}

export default CardProdutos;
