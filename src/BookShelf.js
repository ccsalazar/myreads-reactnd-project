import React,{Component} from 'react'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    books:PropTypes.array.isRequired,
    changeBookShelf:PropTypes.func.isRequired,
    shelfTitle:PropTypes.string.isRequired,
    shelfFilter:PropTypes.string.isRequired,
  }

  render(){
    const {books,changeBookShelf,shelfTitle,shelfFilter} = this.props;
    return(
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelfTitle}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book) => ((book.shelf===shelfFilter)&&
                    (<li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                          }}></div>
                          <div className="book-shelf-changer">
                            <select defaultValue={book.shelf} onChange={(event)=>changeBookShelf(event.target.value,book)}>
                              <option value="none" disabled="disabled">Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors.join(', ')}</div>
                      </div>
                    </li>)))}
                  </ol>
              </div>
            </div>
    )
  }
}

export default BookShelf;
