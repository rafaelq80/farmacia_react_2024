// components/FormCategoria/FormCategoria.tsx
import { RotatingLines } from "react-loader-spinner";
import { useFormCategoria } from "../../../hooks/useFormCategoria";


// Constantes de estilização
const styles = {
    container: "container flex flex-col items-center justify-center mx-auto",
    heading: "text-4xl text-center my-8",
    form: "w-1/2 flex flex-col gap-4",
    inputGroup: "flex flex-col gap-2",
    label: "text-left",
    input: "border-2 border-slate-700 rounded p-2",
    button: "rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center",
};

function FormCategoria() {
    const { categoria, isLoading, handleInputChange, handleSubmit, isEdit } = useFormCategoria();

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                {isEdit ? 'Editar Categoria' : 'Cadastrar Categoria'}
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="grupo" className={styles.label}>Categoria</label>
                    <input
                        type="text"
                        id="grupo"
                        name="grupo"
                        placeholder="Categoria do Produto"
                        className={styles.input}
                        required
                        value={categoria.grupo || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <button className={styles.button} type="submit">
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
