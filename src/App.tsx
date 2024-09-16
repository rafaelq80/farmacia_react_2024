import { BrowserRouter, Route, Routes } from "react-router-dom"
import DeletarCategoria from "./components/categorias/deletarcategorias/DeletarCategorias"
import FormCategoria from "./components/categorias/formcategoria/FormCategoria"
import ListarCategorias from "./components/categorias/listarcategorias/ListarCategorias"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import FormProduto from "./components/produtos/formprodutos/FormProduto"
import ListarProdutos from "./components/produtos/listarprodutos/ListarProdutos"
import DeletarProduto from "./components/produtos/deletarproduto/DeletarProduto"
import Login from "./pages/login/Login"
import Perfil from "./pages/usuarios/perfil/Perfil"
import Cadastro from "./pages/usuarios/cadastro/Cadastro"
import AtualizarUsuario from "./pages/usuarios/atualizarusuario/AtualizarUsuario"

function App() {

  return (
    <>

      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <div className="bg-gray-200 min-h-[90vh]">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/home' element={<Home />} />
            <Route path="/categorias" element={<ListarCategorias />} />
            <Route path="/cadcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
            <Route path="/produtos" element={<ListarProdutos />} />
            <Route path="/cadproduto" element={<FormProduto />} />
            <Route path="/editarproduto/:id" element={<FormProduto />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/atualizarusuario" element={<AtualizarUsuario />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App