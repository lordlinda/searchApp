//while creating our mongoose schema
const mongoose = require('mongoose')
//mongoose helps us to  interact with our mongodb datatbase
//so  mongoose  helps us to  store our  data with a ceratin structure to it
//using  the mongoose.Schema
//in this case since its just a  basic search app we are gonna have
//two properties in our schema
//mongoose allows us to add xtics to these properties of our note schema
const notesSchema = new mongoose.Schema({
	title:{
		type:String
	},
	body:{
		type:String,
		required:true
	}
})
//after creating the schema we then have to export it as amodel
//to be able to use
//in the mongoose model we have two parameters ,the name which is a string that will be stored as a collection
//and mongoose schema just created
module.exports = mongoose.model('note',notesSchema)