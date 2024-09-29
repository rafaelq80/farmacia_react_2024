import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Usuario from "../../../models/Usuario";
import { cadastrarUsuario } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import {
  CadastroFormData,
  cadastroSchema,
} from "../../../validations/CadastroSchema";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  });

  async function cadastrarNovoUsuario(data: CadastroFormData) {
    
    // Definir uma foto padrão caso o campo foto esteja vazio
    const fotoPadrao =
      "https://ik.imagekit.io/vzr6ryejm/usuarios/noimage.png?updatedAt=1726447964819"; // Substitua pela URL da foto padrão desejada

    setUsuario({
      id: 0,
      nome: data.nome,
      usuario: data.usuario,
      senha: data.senha,
      foto: data.foto || fotoPadrao,
    });

    try {
      await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
      ToastAlerta("Usuário cadastrado!", "sucesso");
      navigate("/");
    } catch (error) {
      ToastAlerta("Erro ao cadastrar o usuário!", "erro");
    }
  }

  return (
    <>
      <div className="place-items-center grid grid-cols-1 lg:grid-cols-2 h-screen font-bold">
        <div className="lg:block hidden fundoCadastro"></div>
        <form
          className="flex flex-col justify-center items-center gap-3 w-2/3"
          onSubmit={handleSubmit(cadastrarNovoUsuario)}
        >
          <h2 className="text-5xl text-slate-900">Cadastrar</h2>

          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 p-1 rounded"
              {...register("nome")}
            />
            {errors.nome && (
              <span className="font-semibold text-red-500 text-sm">{errors.nome.message}</span>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="email"
              id="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 p-1 rounded"
              {...register("usuario")}
            />
            {errors.usuario && (
              <span className="font-semibold text-red-500 text-sm">{errors.usuario.message}</span>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 p-1 rounded"
              {...register("foto")}
            />
            {errors.foto && (
              <span className="font-semibold text-red-500 text-sm">{errors.foto.message}</span>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 p-1 rounded"
              {...register("senha")}
            />
            {errors.senha && (
              <span className="font-semibold text-red-500 text-sm">{errors.senha.message}</span>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 p-1 rounded"
              {...register("confirmarSenha")}
            />
            {errors.confirmarSenha && (
              <span className="font-semibold text-red-500 text-sm">
                {errors.confirmarSenha.message}
              </span>
            )}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
