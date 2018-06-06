import React, { Component } from 'react';

class BookShelf extends Component {
  render() {
    const { books, title, onUpdateBook, bookshelftitle } = this.props

    return (
      <div className="bookshelf">
        <h2 className={bookshelftitle}>{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map( (book) =>
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    { book.imageLinks &&
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    }
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={(event) => onUpdateBook(book, event.target.value)} >
                        <option value="moveTo" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  { book.authors &&
                    <div className="book-authors">{book.authors.join(', ')}</div>
                  }
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.defaultProps = {
  bookshelftitle: 'bookshelf-title'
};

export default BookShelf;