import React from  'react'

class Note extends  React.Component{
	render(){
		const {note}=this.props
		return (
			<div className="m-2 p-1">
			<h4>{note.title}</h4>
			<p>{note.body}</p>
			</div>
			)
	}
}

export default Note