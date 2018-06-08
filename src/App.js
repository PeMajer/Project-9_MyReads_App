import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import { Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';


class BooksApp extends React.Component {
  state = {
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

        <Route path='/search' render={ () => (
          <SearchBooks
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                  title='Currently Reading'
                  onUpdateBook={this.updateBook}
                />
                <BookShelf
                  books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                  title='Want to read'
                  onUpdateBook={this.updateBook}
                />
                <BookShelf
                  books={this.state.books.filter((book) => book.shelf === 'read')}
                  title='Read'
                  onUpdateBook={this.updateBook}
                />
              </div>
            </div>
            <Link className='open-search' to='/search'>
              Add a book
            </Link>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
