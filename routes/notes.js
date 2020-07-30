// so this is where our routes are going to be stored
// we need to import express as well bacause we need one of its properties 
// called Router
// router allows the routes to be on a differnt page but  still
// be   can be accessed from server.js and avoid overcrowding
const express =require('express')
const router = express.Router()
// first we import the Notes model because it is what allows us to interact 
// with the mongo database
const Note =require('../models/Note.js')
// we are gonna have just two routes one to show all the notes
// and then one to search for  a particular notes
//@routes                '/notes'
//@description          GET all notes
//@access              Public
router.get('/',(req,res)=>{
	//so the first thing we do is our Note model to such through our database
	//it gives us two parameters conditions:a condition and a callback containing an error or result
	//since here we  want all notes we just pass as a condition an empty object
	Note.find({})
	.then(notes=>{
		//console.log(notes)
		res.status(200).json({notes:notes})
	}).catch(err=>{
		//console.log(err)
		res.status(500).json({error:err})
	})
})
////@routes                '/notes/search text'
//@description          GET all notes that match search text
//@access              Public
router.get('/search/:query',(req,res)=>{
	//so here we are going to get the  text the user has typed in using the req.params
	const query =req.params.query
	//and then we check our database
	//we chech if the title or body  conatins what the user has input
	Note.find({ $or: [{ title: query }, { body: query }] })
	.then(notes=>{
		//console.log(notes)
		res.status(200).json({notes:notes})
	}).catch(err=>{
		//console.log(err)
		res.status(500).json({error:err})
	})
})
//at the end we have to export all our routes
//we just export router from express.Router and that
//exports all the routes
module.exports =router