import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'

class App extends React.Component {

  state = {
    books: [],
    searchQuery: "",
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books || []
      }))
    })
  }

  syncBooks = (searchedBooks) => {
    const ownedBooks = this.state.books
    let newBooks = []
    if (searchedBooks.length > 0) {
      newBooks = searchedBooks.map((searchedBook) => {
        const ownedBook = ownedBooks.find((owned) => owned.id === searchedBook.id)
        return ownedBook ? ownedBook : searchedBook
      })
    }
    this.setState(() => ({
      searchedBooks: newBooks
    }))

  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query)
        .then((books) => {
          console.log('books', books)
          if (query) {
            this.syncBooks(books)
          } else {
            this.setState({ searchedBooks: [] })
          }
        })
    }
  }

  updateQuery = (searchQuery) => {
    this.setState(() => ({
      searchQuery: searchQuery
    }))
    this.searchBooks(searchQuery)
  }
  
  handleOnChange = (book, shelf) => {
    const searchedBooks = this.state.searchedBooks
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books: books }, () => {this.syncBooks(searchedBooks)})
      })
    })
  }

  render() {
    return (
      <Router>
        <Route exact path='/'>
          <MainPage ownedBooks={this.state.books} updateBookShelf={this.handleOnChange} />
        </Route>
        <Route path='/search'>
          <SearchPage
            ownedBooks={this.state.books}
            updateBookShelf={this.handleOnChange}
            searchedBooks={this.state.searchedBooks}
            updateQuery={this.updateQuery} />
        </Route>
      </Router>
    )
  }
}

export default App
