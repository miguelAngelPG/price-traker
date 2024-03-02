'use client'

const Searchbar = () => {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <form 
            className='flex flex-wrap gap-4 mt-12'
            onClick={ handleSubmit }
        >
            <input
                type="text"
                placeholder="Enter Product Link"
                className="searchbar-input"
            />

            <button type="submit" className="searchbar-btn">
                Search
            </button>
        </form>
    )
}

export default Searchbar