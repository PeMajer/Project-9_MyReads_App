import React, { Component } from 'react'
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

  findAndDeleteDuplicate = (showingBooks,books) => {
    let duplicateItem = []
    for (let i = 0; i < showingBooks.length; i++) {
      for (let j = 0; j < books.length; j++) {
        if (showingBooks[i].id === books[j].id) duplicateItem.push(i)
      }
    }
    for (let i = duplicateItem.length-1; i >= 0; i--) {
      showingBooks.splice(duplicateItem[i],1)
    }
  }

  render() {
    const { results, query } = this.state
    const { onUpdateBook, books} = this.props

    let showingBooks
    if (results.length>0 && query.length>0) {
      showingBooks = results
      this.findAndDeleteDuplicate(showingBooks,books)
    } else {
      showingBooks=[]
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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