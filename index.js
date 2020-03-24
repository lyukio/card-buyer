const puppeteer = require('puppeteer')
const cards = require('./cards')

const scrape = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.bazardebagda.com.br/')
    const result = {
        purchased: [],
        notPurchased: []
    }
    for (const card of cards) {
        console.log('========================================');
        console.log(`Card ${cards.indexOf(card)+1} de ${cards.length}.`);
        console.log("card: ")
        console.log(card)
        await page.evaluate((card) => {
            document.querySelector('input#fSearch').value = card
        }, card)
        // await page.focus('input#fSearch')
        // await page.keyboard.type(card)
        
        await page.click('[title="Buscar"]')
        console.log("page.url(): ")
        console.log(page.url())
        console.log('meu pau3')
        await page.screenshot({path: 'screenshot.png', fullPage: true});
        try {
            await page.click('input[value="Comprar"]')
        } catch (error) {
            result.notPurchased.push(card)
        }
        
        result.purchased.push(card)
        const carrinho = await page.evaluate(() => {
            return document.querySelector("div.carrinhoMenu").innerHTML
        })
        console.log("carrinho: ")
        console.log(carrinho)
    }
    console.log('Fim da lista de cards');
    console.log('========================================');
    const totalPrice = await page.evaluate(() => {
        return document.querySelector(".blocoCarrinho").innerHTML
        // return document.querySelector("div#showItens").innerHTML
    })
    result.totalPrice = totalPrice
    browser.close()
    return result
}

scrape().then((value) => {
    console.log("final: ", value)
})