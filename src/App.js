import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'

class App extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }
  
  render() {
    return (
      <Router>
        <Route exact path='/' component={MainPage} />
        <Route path='/search' component={SearchPage} />
      </Router>
    )
  }
}

export default App
