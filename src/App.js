import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }
  
  onUpdateBook = (book, shelf) => {
    //alert("update");
    BooksAPI.update(book, shelf)
    .then((e) => {
        this.componentDidMount();
      })
  }

  render() {
    
    return (
		<div className="app">  
			<Route path='/search' render={() => ( 
				<SearchBooks 
					books={this.state.books}
 					onUpdateBook={this.onUpdateBook}
				/> 
			)} />  
			<Route exact path='/' render={() => ( 
				<ListBooks 
					books={this.state.books}
					onUpdateBook={this.onUpdateBook}
				/>
			)} />
		</div>
    )
  }
}

export default BooksApp