import React, { Component } from 'react';
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    results: [],
    query: ''
  }

  handleSearch = (query) => {
      this.setState({query: query}, () => {
        console.log('Querry je:',query)
        if (this.state.query.length>0) {
          BooksAPI.search(query)
            .then((data) => this.setState({results: data}))
            .catch(()=> this.setState({results: []}))
        } else {
            this.setState({results: []})
        }
      })
  }

  render() {
    const { results, query } = this.state
    const { onUpdateBook, books} = this.props

    let showingBooks
    if (results.length>0 && query.length>0) {
      showingBooks= results
      console.log(showingBooks)
    } else {
      showingBooks=[]
    }



    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              onChange={(event) => this.handleSearch(event.target.value.trim())}
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