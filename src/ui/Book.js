import React from 'react'
import { useContext, useState } from 'react'
import '../App.css'
import BooksContext from '../store/booksContext'

function Book({ book }) {
    const BooksCtx = useContext(BooksContext)
    const [selectedOption, setSelectedOption] = useState(book.shelf ?? 'none')

    const handleOptionChange = (shelf) => {
        setSelectedOption(shelf)
        BooksCtx.update(book, shelf)
    }
    return (
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?.thumbnail ?? 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sisega.com.mx%2Ftag%2Ffresh%2F&psig=AOvVaw171l2EsWIEpoTSKxeqEpbi&ust=1632334931125000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCkn9HXkPMCFQAAAAAdAAAAABAD'})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead" >Want to Read</option>
                            <option value="read" >Read</option>
                            <option value="none" >None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors?.map((author) => {
                    return <div className="book-authors">{author}</div>
                })}

            </div>
        </li>
    )
}



export default Book
