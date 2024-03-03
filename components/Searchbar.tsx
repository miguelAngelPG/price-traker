'use client'

import { scrapeAndStoreProduct } from "@/lib/actions"
import { useState } from "react"

const isValidAmazonProductUrl = (url: string) => {
    try {
        const parsedUrl = new URL(url)
        const hostname = parsedUrl.hostname

        // Check if the URL is an amazon.com product URL

        if(
            hostname.includes('amazon.com') || 
            hostname.includes('amazon.') || 
            hostname.endsWith('amazon')
        ) {
            return true
        }
    } catch (error) {
        return false
    }

    return false
}

const Searchbar = () => {
    
    const [searchPrompt, setSearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isValidLink = isValidAmazonProductUrl(searchPrompt) 

        if (!isValidLink) return alert('Please enter a valid Amazon Product URL')

        try {
            setIsLoading(true)

            const product = await scrapeAndStoreProduct(searchPrompt)
        } catch (error) {
            console.error('Error searching for product:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form 
            className='flex flex-wrap gap-4 mt-12'
            onSubmit={ handleSubmit }
        >
            <input
                type="text"
                placeholder="Enter Product Link"
                className="searchbar-input"
                value={ searchPrompt }
                onChange={(e) => setSearchPrompt(e.target.value)}
            />

            <button 
                type="submit"
                className="searchbar-btn"
                disabled={ searchPrompt === '' }
            >
                { isLoading ? 'Searching...' : 'Search' }
            </button>
        </form>
    )
}

export default Searchbar