import axios from "axios"
import * as cheerio from "cheerio"

export async function scrapeAmazonProduct(productUrl: string) {
    if (!productUrl) return

    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_a41f3bf2-zone-pricetracker:4rvia89nh1up -k https://lumtest.com/myip.json

    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (1000000 * Math.random()) | 0
    const options = {
        auth: {
            username: `${ username }-session-${ session_id }`,
            password
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false
    }

    try {
        const response = await axios.get(productUrl, options)

        console.log('response:', response)
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}