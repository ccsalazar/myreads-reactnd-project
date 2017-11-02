import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(()=>({books})
    )})
  }

  bookShelfUpdate=(shelf,book)=>{
    BooksAPI.update(book,shelf).then(()=>{
      BooksAPI.getAll().then((books)=>{
        this.setState(()=>({books})
      )})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <ListBooks changeBookShelf={this.bookShelfUpdate}
            books={this.state.books}/>
          )}/>
        <Route exact path="/search" render={()=>(
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
