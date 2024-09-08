import Produto from "./Produto";

export default interface Categoria {
    id: number;
    grupo: string;
    produto?: Produto | null;
}