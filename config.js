module.exports = {
    epicGame: {
        url: "https://www.epicgame.com.br/",
        querySelectors: {
            searchInput: "input#fSearch",
            searchButton: "input.btn_busca",
            purchaseButton: '[value="Comprar"]',
            totalValue: "h5#valorTotal b"
        }
    },
    bazarDeBagda: {
        url: "https://www.bazardebagda.com.br/",
        querySelectors: {
            searchInput: "input#fSearch",
            searchButton: '[title="Buscar"]',
            purchaseButton: '[value="Comprar"]',
            cartItens: "div.carrinhoMenu",
            totalValue: "div#precoTotal b"
        }
    }
}