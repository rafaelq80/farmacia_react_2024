import Categoria from "./Categoria";
import Usuario from "./Usuario";

export default interface Produto {
    id: number;
    nome: string;
    preco: number;
    foto: string;
    categoria: Categoria | null;
    usuario: Usuario | null;
    categoria_id: number; //Exclusivo do Golang
    usuario_id: number; //Exclusivo do Golang
}