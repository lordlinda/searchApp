import React from 'react'
import Search from './Search.js'
import Note from  './Note.js'
import AppAlert from  './AppAlert.js'
import axios from 'axios'

class NoteList extends  React.Component{
	//this constructor stores our notes array
	constructor(props){
		super(props)
		this.state ={
			notes:[]
		}

		//we also bind our  non-arrow functions or they will be declared undefined
		this.handleSearch=this.handleSearch.bind(this)
		this.getNotes=this.getNotes.bind(this)
	}
	//here we pick our notes from the backend
	//and place them in our state
	async getNotes(){
		//this is for  getting all the notes
		await axios
		.get('/notes')
		.then(res=> this.setState({notes:res.data.notes}))
		.catch(err=> console.log(err))
	}
	//this function runs on loading our notes component
	//when we load the page we pick the notes from the backend
	async componentDidMount(){
		await this.getNotes()
	}
    //this function is the one responsible for passing the text
    //to the backend to search if the text the user has input has
    //and serach the database and return the notes which match otherwise an empty array
	async handleSearch(searchText){
		//this is for searching
		//we are picking  the search text from the serach component
		await axios
		 .get(`notes/search/${searchText}`)
		 .then(res=> this.setState({notes:res.data.notes}))
		 .catch(err=> console.log(err))
	}
	render(){
		const {notes} =this.state
		return(
			<React.Fragment>
			  <Search onSearch={this.handleSearch} onClear={this.getNotes}/>
			  <div className='row'>
			   <div className='col-sm-12'>
			    <hr />
			      {
			      	//if the length of the notes array is greater than zero
			      	//we pass the note data to the Note component
			      	//otherwise we return the  an error alert message
			      	notes.length > 0 ? (
			      		<ul className='media-list'>
			      		{
			      			notes.map(note=>(
			      				<Note key={note._id} note={note}/>
			      				))
			      		}
			      		</ul>
			      		):(
			      		<AppAlert type='info' message='No contacts to display' />
			      		)
			      }
			   </div>
			  </div>
			</React.Fragment>
			)
	}
}

export default NoteList