import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { deletar, listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Check, X } from "@phosphor-icons/react";
import { useAuthStore } from "../../../store/AuthStore";

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
    <div className='mx-auto w-1/3 container'>
      <h1 className='py-4 text-4xl text-center'>Deletar Produto</h1>
      <p className='mb-4 font-semibold text-center'>
        Você tem certeza de que deseja apagar o Produto a seguir?
      </p>
      <div className='flex flex-col justify-between border rounded-2xl overflow-hidden'>
        <header className='bg-indigo-800 px-6 py-2 font-bold text-2xl text-white'>Produto</header>
        <p className='bg-white p-8 h-full text-3xl'>{produto.nome}</p>
        <div className='flex'>
          <button className='flex justify-center bg-red-400 hover:bg-red-600 py-2 w-full text-slate-100' onClick={retornar}>
            <X size={28} color="#ffffff" weight="bold" />
          </button>
          <button className='flex justify-center items-center bg-indigo-400 hover:bg-indigo-600 w-full text-slate-100' onClick={deletarProduto}>
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
