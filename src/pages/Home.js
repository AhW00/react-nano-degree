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

    return (

        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {loading && <h4>Loading...</h4>}
                                    {!loading && allBooks != null && allBooks.filter((book) => book.shelf == 'currentlyReading').map((book) => {
                                        return <Book key={book.id} book={book}></Book>
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {loading && <h4>Loading...</h4>}
                                    {!loading && allBooks != null && allBooks.filter((book) => book.shelf == 'wantToRead').map((book) => {
                                        return <Book key={book.id} book={book}></Book>
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {loading && <h4>Loading...</h4>}
                                    {!loading && allBooks != null && allBooks.filter((book) => book.shelf == 'read')
                                        .map((book) => {
                                            return <Book key={book.id} book={book}></Book>
                                        })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">

                    <Link to='/search'><button>Add a book</button></Link>
                </div>
            </div>
        </div>
    )
}
