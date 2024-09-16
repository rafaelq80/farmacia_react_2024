import { ChangeEvent } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import Categoria from '../../../models/Categoria';
import { useFormProduto } from '../../../hooks/useFormProduto';

function FormProduto() {
    const {
        produto,
        categorias,
        isLoading,
        isCategoriaPreenchida,
        atualizarEstado,
        gerarNovoProduto,
        buscarCategoriaPorId,
    } = useFormProduto();

    return (
        <div className="flex flex-col items-center mx-auto container">
            <h1 className="my-8 text-4xl text-center">
                {produto.id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col gap-4 w-1/2" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Nome do Produto</label>
                    <input
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Insira aqui o nome do Produto"
                        name="nome"
                        required
                        className="border-2 border-slate-700 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="preco">Preço do Produto</label>
                    <input
                        value={produto.preco}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="number"
                        placeholder="Adicione aqui o preço do Produto"
                        name="preco"
                        required
                        className="border-2 border-slate-700 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="foto">Foto do Produto</label>
                    <input
                        value={produto.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Adicione aqui a foto do Produto"
                        name="foto"
                        required
                        className="border-2 border-slate-700 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Categoria do Produto</p>
                    <select
                        name="categoria"
                        id="categoria"
                        className="border-slate-800 p-2 border rounded"
                        value={produto.categoria?.id || ''}
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" disabled>
                            Selecione uma Categoria
                        </option>
                        {categorias.map((categoria: Categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.grupo}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={!isCategoriaPreenchida || isLoading}
                    className="flex justify-center bg-indigo-400 hover:bg-indigo-800 mx-auto py-2 rounded w-1/2 text-slate-100"
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
                        <span>{produto.id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormProduto;


