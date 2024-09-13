import { RotatingLines } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { useFormProduto } from '../../../hooks/useFormProduto';

function FormProduto() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const {
        isLoading,
        categorias,
        produto,
        categoriaDefault,
        isCategoria,
        atualizarEstado,
        gerarNovoProduto,
        buscarCategoriaPorId
    } = useFormProduto(id, navigate);

    console.log(JSON.stringify(produto))
    
    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>
            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome do Produto</label>
                    <input
                        value={produto.nome}
                        onChange={atualizarEstado}
                        type="text"
                        placeholder="Insira aqui o nome do Produto"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="preco">Preço do Produto</label>
                    <NumericFormat
                        name="preco"
                        required
                        placeholder="Adicione aqui o preço do Produto"
                        onChange={atualizarEstado}
                        value={produto.preco}
                        thousandSeparator={true}
                        decimalSeparator='.'
                        decimalScale={2}
                        fixedDecimalScale
                        allowLeadingZeros
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="foto">Foto do Produto</label>
                    <input
                        value={produto.foto}
                        onChange={atualizarEstado}
                        type="text"
                        placeholder="Adicione aqui a foto do Produto"
                        name="foto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Categoria do Produto</p>
                    <select
                        name="categoria"
                        id="categoria"
                        className='border p-2 border-slate-800 rounded'
                        onChange={e => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" disabled>Selecione uma Categoria</option>
                        {categorias.map(categoria => (
                            <option
                                key={categoria.id}
                                value={categoria.id}
                                selected={categoriaDefault === categoria.id}
                            >
                                {categoria.grupo}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type='submit'
                    disabled={isCategoria}
                    className='flex justify-center rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2'
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormProduto;
