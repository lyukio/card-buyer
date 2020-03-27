const puppeteer = require('puppeteer')
const cards = require('./cards')
const {chq: config} = require('./config')

const scrape = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(config.url)
    const result = {
        purchased: [],
        notPurchased: []
    }
    for (const card of cards) {
        console.log('========================================');
        console.log(`Card ${cards.indexOf(card)+1} de ${cards.length}.`);
        console.log("card: ")
        console.log(card)
        await page.evaluate(({card, config}) => {
            document.querySelector(config.querySelectors.searchInput).value = card
        }, {card, config})
        await page.click(config.querySelectors.searchButton)
        try {
            await page.screenshot({path: 'screenshot.png', fullPage: true});
        } catch (error) {
            console.error(error)
        }
        try {
            await page.click(config.querySelectors.purchaseButton)
        } catch (error) {
            result.notPurchased.push(card)
        }
        result.purchased.push(card)
        if (!config.querySelectors.cartItens) continue
        const carrinho = await page.evaluate((config) => {
            return document.querySelector(config.querySelectors.cartItens).innerHTML
        }, config)
        console.log("carrinho: ")
        console.log(carrinho)
    }
    console.log('Fim da lista de cards');
    console.log('========================================');
    await page.goto(`${config.url}?view=ecom/carrinho`)
    console.log("page.url(): ")
    console.log(page.url())
    try {
        await page.screenshot({path: 'screenshot.png', fullPage: true});
    } catch (error) {
        console.error(error)
    }
    const totalValue = await page.evaluate((config) => {
        return document.querySelector(config.querySelectors.totalValue).innerHTML
    }, config)
    result.totalValue = totalValue
    browser.close()
    return result
}

scrape().then((value) => {
    console.log("final: ", value)
})