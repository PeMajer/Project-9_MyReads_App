import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( (allBooks) => {
      this.setState({books: allBooks})
    })
  }

  updateBook = (book,shelf) => {
    book.shelf=shelf
    BooksAPI.update(book,shelf).then(()=>{
      book.shelf !== 'none' ?
      this.setState({
        books: this.state.books.filter((b) => b.id !== book.id).concat([ book ])
      }) :
      this.setState({
        books: this.state.books.filter((b) => b.id !== book.id)
      })
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.state.books.filter((book)=> book.shelf === 'currentlyReading')}
                  title='Currently Reading'
                  onUpdateBook={this.updateBook}
                 />
                <BookShelf
                  books={this.state.books.filter((book)=> book.shelf === 'wantToRead')}
                  title='Want to read'
                  onUpdateBook={this.updateBook}
                 />
                <BookShelf
                  books={this.state.books.filter((book)=> book.shelf === 'read')}
                  title='Read'
                  onUpdateBook={this.updateBook}
                 />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
