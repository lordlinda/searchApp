import React from 'react'


class Search  extends React.Component{
  //this is a constructor for storing state and binding non-arrow functions
  //in our state  we keep our search text which the user will input into the search bar
	constructor(props){
		super(props)
		this.state ={
			searchText:""
		}
		this.handleChange=this.handleChange.bind(this)
	   this.handleSubmit=this.handleSubmit.bind(this)
	   this.onClear=this.onClear.bind(this)
	}
//the handleChange method picks  the  value the user has input
//in the serach bar and stores it in the state of searchText
   handleChange(e){
   const searchText=e.target.value
   //console.log(e.target.value)
   this.setState({searchText})
   }
  //here we submit  our search text and  we pass it through to the OnSearch function
    handleSubmit(e){
      //we ensure that   we prevent the automatic  submission for onSubmit
    	e.preventDefault();
      //we get the  value  of searchText from the state
    const {searchText} =this.state
    if(searchText.length > 0){
      //if the user has input something text we pass the searchtext to the parent component
    	this.props.onSearch(searchText)
    }else{
      //else nothing happens
    	console.log('search text is empty')
    }
  }

  onClear(){
    //for the onClear function we return  all notes back
  	const {searchText}=this.state
  	if(searchText.length > 0){
      //if the user has input something we set it back to an empty string
  		this.setState({searchText:""})
      //and we pass it through to the parent component
  		this.props.onClear()
  	}else{
      //otherwise we do nothing
       console.log('search text is empty')
  	}
  }

  render(){
  	return (
  		<div className='row'>
  		 <div className='col-sm-offset-3 col-sm-12'>
  		  <form onSubmit={this.handleSubmit}>
  		   <div className='input-group'>
  		    <span className='input-group-btn'>
  		     <button
  		      className='btn btn-warning'
  		     type='button'
  		      onClick={this.onClear}
  		      >
  	     	 Clear
  	     	</button>
  		  </span>
  		    <input 
  		     type='text'
  		    className='form-control'
  	     	placeholder='Search for...'
  		    value={this.state.searchText}
  		    onChange={this.handleChange} />
  		  <span className='input-group-btn'>
  		    <button className='btn btn-success' type='submit'>
  		     Search
  		    </button>
  		  </span>
   		</div>
  	</form>
  </div>
</div>
  		)
  }
}

export default Search