import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'


class SearchBooks extends Component{
  static propTypes = {
    books:PropTypes.array.isRequired,
    changeBookShelf:PropTypes.func.isRequired
  }
  state = {
    query : '',
    results: []
  }

  updateQuery = (query)=>{
    this.setState({query})
    if(query){
      BooksAPI.search(query,20).then((results)=>{
        if (!results || results.error){
          this.setState({results:[]})
        }
        else {
          this.getShelfStatus(results)
          this.setState({results})
        }
      })
    } else {
      this.setState({results:[]})
    }
  }

  getShelfStatus = (results)=>{
    results.forEach(result=>{
      this.props.books.forEach(book=>{
        if(result.id===book.id){
          result.shelf = book.shelf;
        }
      })
      if (!result.shelf){
        result.shelf='none'
      }
    })
  }


  render(){
    const {changeBookShelf} = this.props
    const {query,results} = this.state
    this.getShelfStatus(results);
    results.forEach(result=>{console.log(result.shelf)})

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}></div>
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf?book.shelf:'none'} onChange={(event)=>changeBookShelf(event.target.value,book)}>
                        <option value="none" disabled="disabled">Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
