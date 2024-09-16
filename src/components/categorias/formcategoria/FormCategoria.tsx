// components/FormCategoria/FormCategoria.tsx
import { RotatingLines } from "react-loader-spinner";
import { useFormCategoria } from "../../../hooks/useFormCategoria";

function FormCategoria() {
    
    const { categoria, isLoading, handleInputChange, handleSubmit, isEdit } = useFormCategoria();

    return (
        <div className='flex flex-col justify-center items-center mx-auto container'>
            <h1 className='my-8 text-4xl text-center'>
                {isEdit ? 'Editar Categoria' : 'Cadastrar Categoria'}
            </h1>
            <form className='flex flex-col gap-4 w-1/2' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="grupo" className='text-left'>Categoria</label>
                    <input
                        type="text"
                        id="grupo"
                        name="grupo"
                        placeholder="Categoria do Produto"
                        className='border-2 border-slate-700 p-2 rounded'
                        required
                        value={categoria.grupo || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <button className='flex justify-center bg-indigo-400 hover:bg-indigo-800 mx-auto py-2 rounded w-1/2 text-slate-100' type="submit">
                    {isLoading ? (
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    ) : (
                        <span>{isEdit ? 'Atualizar' : 'Cadastrar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormCategoria;
