import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading : [],
    wantToRead : [],
    read : []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(()=>({
        currentlyReading:books.filter(book=>book.shelf==='currentlyReading'),
        wantToRead:books.filter(book=>book.shelf==='wantToRead'),
        read:books.filter(book=>book.shelf==='read')
      }))
    })
  }

  bookShelfUpdate=(shelf,book)=>{
    BooksAPI.update(book,shelf).then((books)=>{
      console.log('update',books)
    })
  }


  render() {
    console.log('wantToRead',this.state.wantToRead);
    console.log('read',this.state.read);
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <ListBooks
            changeBookShelf={this.bookShelfUpdate}
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}/>
        )}/>
        <Route exact path="/search" render={()=>(
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
