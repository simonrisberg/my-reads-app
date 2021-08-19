import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import MissingImage from '../icons/book-pack.svg'
import '../App.css'

class SearchPage extends Component {

  state = {
    searchQuery: "",
    books: []
  }

  fetchBooks = (query) => {
    if (this.state.searchQuery && this.state.searchQuery != null) {
      BooksAPI.search(this.state.searchQuery)
        .then((books) => {
          console.log('books', books)
          if(query !== "") {
            this.syncBooks(books)
          }else{
            this.setState({books: []})
          }
          
        })
    }
  }

  updateQuery = (searchQuery) => {
    this.setState(() => ({
      searchQuery: searchQuery
    }))
    this.fetchBooks(searchQuery)
  }

  syncBooks = (searchedBooks) => {
    const { ownedBooks } = this.props
    let newBooks = []
    if(searchedBooks.length > 0) {
      newBooks = searchedBooks.map((searchedBook) => {
        const ownedBook = ownedBooks.find((owned) => owned.id === searchedBook.id)
        return ownedBook ? ownedBook : searchedBook
      })
    }
    this.setState(() => ({
      books: newBooks
    }))

  }

  render() {
    const { searchQuery } = this.state
    const books = this.state.books
    const { updateBookShelf } = this.props

    const fetchAuthors = (authors) => (
      authors != null ? authors.toString() : "Anonymous"
    )

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={'/'}>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(e) => this.updateQuery(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length === 0 || books.error === "empty query" ? (<div>
              <span>No books to be shown</span>
            </div>) : books.map((book) => (
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage