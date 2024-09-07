import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import './ModalProduto.css';
import FormularioProdutos from '../formprodutos/FormProduto';

function ModalProduto() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border-2 rounded px-4 py-2 border-indigo-900 text-indigo-900 hover:bg-indigo-900 hover:text-white'>
                        Novo Produto
                    </button>
                }
                modal
            >
                <FormularioProdutos />
            </Popup>
        </>
    );
}

export default ModalProduto;