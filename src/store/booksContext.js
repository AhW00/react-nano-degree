import axios from "axios"
import { createContext, useState, useContext, React } from "react"

const BooksContext = createContext({
    fetchAll: () => { },
    update: (book, shelf) => { },
    search: (query) => { },
    clearSearchResults: () => { },
    allBooks: [],
    searchResults: [],
    loading: false,
})

export function BooksContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false)
    const [allBooks, setAllBooks] = useState()
    const [searchResults, setSearchResults] = useState([])

    const api = "https://reactnd-books-api.udacity.com"

    // Generate a unique token for storing your bookshelf data on the backend server.
    let token = localStorage.token
    if (!token)
        token = localStorage.token = Math.random().toString(36).substr(-8)

    const headers = {
        'Accept': 'application/json',
        'Authorization': token
    }

    const fetchAllBooks = async () => {

        try {
            setIsLoading(true)
            let response = await axios.get(`${api}/books/`, { headers: headers })
            let allBooks = response.data.books
            setAllBooks((prevAllBooks) => allBooks)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            console.log(error.message)
        }
    }

    const updateBook = async (book, shelf) => {


        try {
            let response = await axios.put(`${api}/books/${book.id}`, { 'shelf': shelf }, {
                headers: headers
            })
            let tempAllBooks = allBooks
            let bookIndex = tempAllBooks.findIndex((b) => b.id === book.id)
            if (bookIndex != -1)
                tempAllBooks[bookIndex].shelf = shelf
            else {
                let newBook = book
                newBook.shelf = shelf
                tempAllBooks.push(newBook)
                console.log(tempAllBooks)
            }
            setAllBooks((prevAllBooks) => [...tempAllBooks])

        } catch (error) {

            console.log(error.message)
        }
    }

    const search = async (query) => {
        try {
            let response = await axios.post(`${api}/search`, { 'query': query }, {
                headers: headers
            })

            if (response.data.books.error != null)
                setSearchResults((prevSearchResults) => [])

            else {
                let results = response.data.books
                let book = {}
                for (let i = 0; i < results.length; i++) {
                    book = allBooks.find((element) => element.id === results[i].id)
                    if (book != null)
                        results[i].shelf = book.shelf
                }
                setSearchResults((prevSearchResults) => response.data.books)
            }

        } catch (error) {
            console.log(error.message)
            setSearchResults((prevSearchResults) => [])
        }
    }

    const clearSearchResults = () => {
        setSearchResults((prevSearchResults) => [])
    }

    const context = {
        fetchAll: fetchAllBooks,
        update: updateBook,
        search: search,
        clearSearchResults: clearSearchResults,
        allBooks: allBooks,
        searchResults: searchResults,
        loading: isLoading,
    }

    return <BooksContext.Provider value={context}>
        {children}
    </BooksContext.Provider>
}

export default BooksContext;