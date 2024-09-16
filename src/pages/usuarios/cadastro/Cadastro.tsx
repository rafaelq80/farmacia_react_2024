import { ChangeEvent, FormEvent, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import Usuario from "../../../models/Usuario";
import { cadastrarUsuario } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    name: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Definir uma foto padrão caso o campo foto esteja vazio
    const fotoPadrao = "https://ik.imagekit.io/vzr6ryejm/usuarios/noimage.png?updatedAt=1726447964819"; // Substitua pela URL da foto padrão desejada
    
    // Criar uma cópia do usuário com a foto padrão se necessário
    const usuarioComFotoPadrao = {
      ...usuario,
      foto: usuario.foto.trim() === "" ? fotoPadrao : usuario.foto,
    };

    if (confirmaSenha === usuarioComFotoPadrao.senha && usuarioComFotoPadrao.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuarioComFotoPadrao, setUsuario);
        ToastAlerta("Usuário cadastrado!", "sucesso");
        navigate("/"); // Navega para a página inicial após o sucesso
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      }
    } else {
      ToastAlerta(
        "Dados inconsistentes. Verifique as informações do cadastro.",
        "erro"
      );
      setUsuario((prevUsuario) => ({ ...prevUsuario, senha: "" }));
      setConfirmaSenha("");
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className="place-items-center grid grid-cols-1 lg:grid-cols-2 h-screen font-bold">
        <div className="lg:block hidden fundoCadastro"></div>
        <form
          className="flex flex-col justify-center items-center gap-3 w-2/3"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-5xl text-slate-900">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              className="border-2 border-slate-700 p-2 rounded"
              value={usuario.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 p-2 rounded"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 p-2 rounded"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 p-2 rounded"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 p-2 rounded"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />
          </div>

          <div className="flex justify-around gap-8 w-full">
            <button
              className="bg-red-400 hover:bg-red-700 py-2 rounded w-1/2 text-white"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex justify-center bg-indigo-500 hover:bg-indigo-800 py-2 rounded w-1/2 text-white"
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
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
