import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SingleBook from './SingleBook'

class ListBooks extends Component {
  state = {
    shelfes: [
		{ id: 'currentlyReading', name: 'Currently Reading' },
		{ id: 'wantToRead', name: 'Want To Read' },
		{ id: 'read', name: 'Read' }
    ],
  };
  onUpdateBook = (book, shelf) => {
    this.props.onUpdateBook(book, shelf);
  }
  
  render() {
	const { books } = this.props
    return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
		<div className="list-books-content">
        
		{this.state.shelfes.map((shelf) => (
      		<div className="bookshelf">
        		<h2 className="bookshelf-title">{shelf.name}</h2>
      			<div className="bookshelf-books">
					<ol className="books-grid">
      					{books.filter(book => book.shelf === shelf.id).map((book) => (
							<SingleBook key={book.id} book={book} onUpdateBook={this.onUpdateBook}/>
						))}
					</ol>
				</div>
			</div>      	
			))}
      
			<div className="open-search">
				<Link
                  className='open-search'
                  to='/search'>
                    Add a book
                </Link>
			</div>
        </div>
	</div>
    )
	}
}

export default ListBooks