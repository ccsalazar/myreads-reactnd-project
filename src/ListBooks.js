import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelfContent from './BookShelfContent'


class ListBooks extends Component {
  static PropTypes = {
    books:PropTypes.array.isRequired
  }

  render(){

    const {books} = this.props;
    let currentlyReading;
    let wantToRead;
    let finishedReading;

    currentlyReading = books.filter(book=>book.shelf==='currentlyReading');
    wantToRead = books.filter(book=>book.shelf==='wantToRead');
    finishedReading = books.filter(book=>book.shelf==='read');

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BookShelfContent shelfContent={currentlyReading}/>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookShelfContent shelfContent={wantToRead}/>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookShelfContent shelfContent={finishedReading}/>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search' >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
