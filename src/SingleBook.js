import React, { Component } from 'react'


class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: this.props.book.shelf };
  }
  	
	handleChange(event) {
      this.setState({value: event.target.value});
      this.props.onUpdateBook(this.props.book, event.target.value);
	}
  
  bookInShelf = currBook => {
    const books = this.props.books;
    for (let book of books) {
      if (book.id === currBook.id) {
        return (book.shelf);
      }
    }
    return false;
  };

	componentDidMount() {
    	const bookIsInShelf = this.bookInShelf(this.props.book);
		
		if (bookIsInShelf) {
        	this.setState(() => ({
      			value: bookIsInShelf
    		}));
        }
    }

  render() {
	const { book } = this.props
    return (
	<li key={book.id}>
		<div className="book">
			<div className="book-top">
				<div className="book-cover" 
				style={{ 
       				width: 128, 
       				height: 193, 
       				backgroundImage: `url(${book.imageLinks.smallThumbnail})` 
				}}>
				</div>
				<div className="book-shelf-changer">
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="move" disabled>Move to...</option>
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
	</li>
    )
  }
}

export default SingleBook