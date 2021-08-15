import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import MissingImage from '../icons/book-pack.svg'
import '../App.css'

class MainPage extends Component {


  render() {
    const { ownedBooks, updateBookShelf } = this.props

    const currentlyReadingBooks = ownedBooks.filter((book) => (
      book.shelf.includes("currentlyReading")
    ))

    const wantToReadBooks = ownedBooks.filter((book) => (
      book.shelf.includes("wantToRead")
    ))

    const readBooks = ownedBooks.filter((book) => (
      book.shelf.includes("read")
    ))

    const fetchAuthors = (authors) => (
      authors != null ? authors.toString() : "Anonymous"
    )

    return (
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
                  {currentlyReadingBooks.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : `${MissingImage}` })` }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf || 'none'} onChange={(e) => updateBookShelf(book, e.target.value)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{fetchAuthors(book.authors)}</div>
                      </div>
                    </li>))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(e) => BooksAPI.update(book, e.target.value)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{fetchAuthors(book.authors)}</div>
                      </div>
                    </li>))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(e) => BooksAPI.update(book, e.target.value)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{fetchAuthors(book.authors)}</div>
                      </div>
                    </li>))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Link className="open-search" to={'/search'}>Search for books</Link>
      </div>
    )
  }
}

export default MainPage
