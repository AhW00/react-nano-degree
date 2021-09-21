import { useEffect, useContext } from 'react'
import BooksContext from '../store/booksContext';
import '../App.css'
import { Link } from 'react-router-dom';
import React from 'react'
import Book from '../ui/Book';
export default function Home() {
    const BooksCtx = useContext(BooksContext)
    const loading = BooksCtx.loading
    const allBooks = BooksCtx.allBooks

    useEffect(() => {
        if (allBooks == null)
            BooksCtx.fetchAll()
        return () => { }
    }, [])

    const shelves = [
        { title: 'Read', key: 'read' },
        { title: 'Want To Read', key: 'wantToRead' },
        { title: 'Currently Reading', key: 'currentlyReading' }
    ];

    return (

        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf, index) => {
                            return <div key={index} className="bookshelf">
                                <h2 className="bookshelf-title">{shelf.title}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {loading && <h4>Loading...</h4>}
                                        {!loading && allBooks != null && allBooks.filter((book) => book.shelf == shelf.key).map((book) => {
                                            return <Book key={book.id} book={book}></Book>
                                        })}
                                    </ol>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className="open-search">

                    <Link to='/search'><button>Add a book</button></Link>
                </div>
            </div>
        </div>
    )
}
