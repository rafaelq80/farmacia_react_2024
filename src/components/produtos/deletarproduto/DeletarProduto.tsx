import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { deletar, listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Check, X } from "@phosphor-icons/react";
import { useAuthStore } from "../../../store/AuthStore";

// Estilos separados em um objeto
const styles = {
    container: "container w-1/3 mx-auto",
    title: "text-4xl text-center py-4",
    description: "text-center font-semibold mb-4",
    productContainer: "border flex flex-col rounded-2xl overflow-hidden justify-between",
    header: "py-2 px-6 bg-indigo-800 text-white font-bold text-2xl",
    productName: "p-8 text-3xl bg-white h-full",
    buttonContainer: "flex",
    cancelButton: "text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2 flex justify-center",
    confirmButton: "w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center",
  };
  
function DeletarProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produto, setProduto] = useState<Produto>({} as Produto);
  const token = usuario.token;

  // Função auxiliar para headers
  const headers = {
    Authorization: token,
  };

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
      return;
    }

    if (id) {
      buscarPorId(id);
    }
  }, [token, id]);

  // Função para buscar o produto pelo ID
  async function buscarPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto, { headers });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Produto não encontrado!", "erro");
      }
    }
  }

  // Função para deletar o produto
  async function deletarProduto() {
    setIsLoading(true);
    try {
      await deletar(`/produtos/${id}`, { headers });
      ToastAlerta("Produto apagado com sucesso", "sucesso");
      retornar();
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao apagar o Produto", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/produtos");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Deletar Produto</h1>
      <p className={styles.description}>
        Você tem certeza de que deseja apagar o Produto a seguir?
      </p>
      <div className={styles.productContainer}>
        <header className={styles.header}>Produto</header>
        <p className={styles.productName}>{produto.nome}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={retornar}>
            <X size={28} color="#ffffff" weight="bold" />
          </button>
          <button className={styles.confirmButton} onClick={deletarProduto}>
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <Check size={28} color="#ffffff" weight="bold" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarProduto;
