import { React, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import BooksContext from '../store/booksContext';
import Book from '../ui/Book';
export default function Search() {
    const BooksCtx = useContext(BooksContext)
    const searchResults = BooksCtx.searchResults
    const handleSearch = (query) => {
        BooksCtx.search(query)
    }

    useEffect(() => {
        BooksCtx.clearSearchResults()
        return () => { }
    }, [])

    return (
        <div className="app">
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'> <button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={(e) => handleSearch(e.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            searchResults.map((book) => {
                                return <Book key={book.id} book={book}></Book>
                            })
                        }
                    </ol>
                </div>
            </div>

        </div>
    )
}
