import { MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react";
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useAuthStore()

    function logout() {

        handleLogout()
        ToastAlerta('Usuário desconectado!', 'info')
        navigate('/')

    }

    let component: ReactNode

    if (usuario.token !== '') {
        
        component = (
            <div className='flex justify-center bg-indigo-900 py-4 w-full text-white'>
                <div className="flex justify-between text-lg container">
                    <Link to='/home'>
                        <img
                            src="https://ik.imagekit.io/vzr6ryejm/farmacia/logo.png?updatedAt=1725625779644"
                            alt="Logo"
                            className='w-60'
                        />
                    </Link>

                    <div className="relative flex justify-center items-center w-1/3 text-black">
                        <form className='flex justify-center items-center w-full'>
                            <input className="px-4 py-4 rounded-lg w-10/12 h-9 focus:outline-none"
                                type="search"
                                placeholder="Pesquisar produto"
                                id="busca"
                                name="busca"
                                required
                            />
                            <button type="submit"
                                className="flex justify-center items-center border-2 border-cyan-800 hover:border-cyan-400 bg-cyan-500 hover:bg-transparent rounded-lg w-10 h-10 font-medium text-sm text-white ms-2"
                            >
                                <MagnifyingGlass size={24} weight="bold" className="hover:fill-cyan-400" />
                            </button>
                        </form>
                    </div>

                    <div className='flex items-center gap-4 py-4'>
                        <Link to='/produtos' className="hover:underline">Produtos</Link>
                        <Link to='/categorias' className="hover:underline">Categorias</Link>
                        <Link to='/cadcategoria' className="hover:underline">Cadastrar Categoria</Link>
                        <Link to='' onClick={logout} className="hover:underline">Sair</Link>
                        <Link to='/Perfil' ><img src={usuario.foto} alt={usuario.name} className="border-transparent rounded-full w-8 h-8"/></Link>
                        <Link to='#' ><ShoppingCart size={32} weight='bold' /></Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Navbar