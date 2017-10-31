import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <MainPage books={this.state.books}/>
        )}/>
        <Route exact path="/search" render={()=>(
          <SearchPage/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
