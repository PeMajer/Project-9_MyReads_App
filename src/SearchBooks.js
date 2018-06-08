import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    results: [],
    query: ''
  }

  search = (query) => {
    this.setState({query: query}, () => {
      if (this.state.query.length>0) {
        BooksAPI.search(query)
          .then((data) => this.setState({results: data}))
          .catch(()=> this.setState({results: []}))
      } else {
          this.setState({results: []})
      }
    })
  }

  isBookInShelf = (showingBooks,books) => {

    for (let i = 0; i < showingBooks.length; i++) {
      for (let j = 0; j < books.length; j++) {
        if (showingBooks[i].id === books[j].id) showingBooks[i].shelf = books[j].shelf
      }
    }
  }

  render() {
    const { results, query } = this.state
    const { onUpdateBook, books } = this.props

    let showingBooks
    if (results.length >0 && query.length>0){
      showingBooks = results
      this.isBookInShelf(showingBooks,books)
    } else {
      showingBooks=[]
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              onChange={(event) => this.search(event.target.value.trim())}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf
            books={showingBooks}
            onUpdateBook={onUpdateBook}
            bookshelftitle=''
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks;