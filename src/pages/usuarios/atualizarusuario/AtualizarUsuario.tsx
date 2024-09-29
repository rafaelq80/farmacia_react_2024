import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Usuario from "../../../models/Usuario";
import { atualizar, listar } from "../../../services/Service";
import { useAuthStore } from "../../../store/AuthStore";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import "./AtualizarUsuario.css";

function AtualizarUsuario() {
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Usuario>({} as Usuario);

  const navigate = useNavigate();
  const { usuario, setFoto } = useAuthStore();
  const token = usuario.token;
  const [fotoAtual, setFotoAtual] = useState<string>(usuario.foto);
  const id: string = usuario.id.toString();

  async function buscarPorId(id: string) {
    try {
      await listar(`/usuarios/${id}`, setUser, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      ToastAlerta("Usuário não encontrado!", "erro");
      retornar();
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setFotoAtual(user.foto)
  }, [user.foto])

  function retornar() {
    navigate("/perfil");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function atualizarUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === user.senha && user.senha.length >= 8) {
      setIsLoading(true);

      try {
        await atualizar(`/usuarios/atualizar`, user, setUser, {
          headers: {
            Authorization: token,
          },
        });

        setFoto(user.foto);

        ToastAlerta("Dados do Usuário atualizados!", "sucesso");
        retornar()

      } catch (error) {
        ToastAlerta("Erro ao atualizar o usuário!", "erro");
        retornar();
      }
    } else {
      ToastAlerta(
        "Dados inconsistentes. Verifique as informações do usuario.",
        "erro"
      );
      setUser({ ...user, senha: "" });
      setConfirmaSenha("");
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="justify-center grid grid-cols-[1fr_2fr] h-[110vh]">
        <div className="flex flex-col justify-center items-center w-full">
          <img
            src={fotoAtual}
            alt={user.nome}
            className="shadow-md shadow-slate-600 border rounded-full w-3/4 object-cover"
          />
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="my-4 w-full text-4xl text-center">Editar Perfil</h1>

          <form
            className="flex flex-col justify-center items-center gap-3 w-3/4"
            onSubmit={atualizarUsuario}
          >
            <div className="flex flex-col w-full">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Nome"
                className="border-2 border-slate-700 p-2 rounded"
                value={user.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Usuario"
                className="border-2 border-slate-700 p-2 rounded"
                disabled
                value={user.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="foto">Foto</label>
              <input
                type="url"
                id="foto"
                name="foto"
                placeholder="Foto"
                className="border-2 border-slate-700 p-2 rounded"
                value={user.foto}
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
                autoComplete="new-password" 
                value={user.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
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
                onClick={retornar}
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
                  <span>Atualizar</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AtualizarUsuario;
