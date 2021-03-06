import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MissingImage from '../icons/book-pack.svg'
import '../App.css'

class SearchPage extends Component {
  render() {
    const { updateBookShelf, searchedBooks, updateQuery, searchQuery } = this.props

    const fetchAuthors = (authors) => (
      authors != null ? authors.toString() : "Anonymous"
    )

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={'/'}>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(e) => updateQuery(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.length === 0 || searchedBooks.error === "empty query" ? (<div>
              <span>No searchedBooks to be shown</span>
            </div>) : searchedBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : `${MissingImage}`})` }}></div>
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage