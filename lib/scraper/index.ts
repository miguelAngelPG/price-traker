import axios from "axios"
import * as cheerio from "cheerio"
import { extractCurrency, extractDescription, extractPrice } from "../utils"

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

        const $ = cheerio.load(response.data)

        // Extract the product title
        const title = $('#productTitle').text().trim()
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price.a-size-medium.apexPriceToPay .a-offscreen'),
        )

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('#a-size-base.a-color-price'),
            $('.a-span12 .a-price.a-text-price.a-size-base .a-offscreen'),
            $('.a-price.a-text-price span.a-offscreen'),
        )

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        const images = $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image') || '{}'

        const imageUrls = Object.keys(JSON.parse(images))

        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = isNaN(Number($('.savingsPercentage').text().replace(/[-%]/g, ''))) ? 0 : $('.savingsPercentage').text().replace(/[-%]/g, '')

        const description = extractDescription($)

        const data = {
            url: productUrl,
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount: 100,
            stars: 4.5,
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            average: Number(currentPrice) || Number(originalPrice),
        }

        return data
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}