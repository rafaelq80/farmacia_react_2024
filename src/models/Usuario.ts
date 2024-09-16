import Produto from "./Produto";

export default interface Usuario {
    id: number;
    name: string;
    usuario: string;
    senha: string;
    foto: string;
    produto?: Produto | null;
}