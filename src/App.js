import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(()=>({books}));
    })
  }

  bookShelfUpdate=(shelf,book)=>{
    BooksAPI.update(book,shelf).then(()=>{
      BooksAPI.getAll().then((books)=>{
        this.setState(()=>({books}));
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  shelfTitle="Currently Reading"
                  shelfFilter="currentlyReading"
                  changeBookShelf={this.bookShelfUpdate}
                  books={this.state.books}/>
                <BookShelf
                  shelfTitle="Want to Read"
                  shelfFilter="wantToRead"
                  changeBookShelf={this.bookShelfUpdate}
                  books={this.state.books}/>
                <BookShelf
                  shelfTitle="Read"
                  shelfFilter="read"
                  changeBookShelf={this.bookShelfUpdate}
                  books={this.state.books}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' >Add a book</Link>
            </div>
          </div>
        )}/>
        <Route exact path="/search" render={()=>(
          <SearchBooks
            changeBookShelf={this.bookShelfUpdate}
            books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
