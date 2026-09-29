export class ItemCesta {
    constructor(
        public idProduto: number,
        public nome: string,
        public preco: number,
        public quantidade: number,
        public imagem: string
    ) {}

    get subtotal(): number {
        return this.preco * this.quantidade;
    }
}