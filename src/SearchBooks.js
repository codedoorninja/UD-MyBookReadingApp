import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import SingleBook from './SingleBook'

class SearchBooks extends Component {
	state = {
		searchResults: [],
		query: ''
	}
	updateQuery = (query) => {
		this.setState(() => ({
			query: query
		}))
      
      if(query.length >= 3) {
        BooksAPI.search(query, 20)
          .then((searchResults) => {
          this.setState(() => ({
            searchResults
          }))
        })
      } else {
      	this.setState(() => ({
            searchResults: []
          }))
      }
	}

	onUpdateBook = (book, shelf) => {
    	this.props.onUpdateBook(book, shelf);
  	}
	
  render() {
    	const { searchResults} = this.state
	return (
		<div className="search-books">
            <div className="search-books-bar">
                <Link
                  className='close-search'
                  to='/'>
                    Close
                </Link>
              <div className="search-books-input-wrapper">
              <input 
    				type="text" 
    				placeholder="Search by title or author (min 3 characters)"
					value={this.state.query}
					onChange={(event) => this.updateQuery(event.target.value)}
	   			/>
              </div>
            </div>
            <div className="search-books-results">
            	<ol className="books-grid">
					{searchResults.length > 0 ? searchResults.map((book) => (
						<SingleBook key={book.id} book={book} onUpdateBook={this.onUpdateBook} books={this.props.books}/>
					)) : this.state.query !== '' && this.state.query.length >= 3 ? 'No results found' : ''}
				</ol>
            </div>
		</div>
    )
  }
}

export default SearchBooks