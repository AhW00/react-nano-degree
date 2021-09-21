import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { BooksContextProvider } from './store/booksContext'

ReactDOM.render(
    <BooksContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </BooksContextProvider>, document.getElementById('root'))
