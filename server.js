//so this is our main backend app
//first we import our third party modules that we need
const express =  require('express')
const bodyParser =require('body-parser')
const cors  =require('cors')
const morgan =require('morgan')
const dotenv =require('dotenv')
const mongoose =require('mongoose')
//before initialising our app we connect to the mongodb database
//we also use dotenv to store the mongodb _uri,
//we access it using the dotenv module for deployment
//but for just development we  can use  our local database
 dotenv.config()
 mongoose.connect('mongodb://localhost/searchApp' || process.env.MONGODB_URL,{
 useNewUrlParser: true,
  useUnifiedTopology: true
 }).then(
 //if mongodb is connected successfully we console.log()it
 ()=>console.log('connected successfully to mongodb')
 ).catch(err=>{
 	//if there is an error we console.log() an error message
 	console.log('just a little issue with mongodb')
 })
//then we initialise the express app
const app = express()
//to use our  middlewares we always begin with app.use
//where app in our initialised express app
////right after initalisng our app we need to use the cors middleware
///since our front and backend are going to be on different ports
app.use(cors())
//there is some middleware we need to run before our routes
//e.g body parser
//body parser allows us to access the  data sent by the user using req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
////the morgan middleware also comes before the routes and we use it to
///see the routes the response and the time taken for each request in the backend
///we usually only use it for developement and not production/deployment
if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}
///also when we go for deployment we serve only the static files
//you need to specify this only for deployment
// so that as long as you are in developent you do not serve static files
if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'))
}

//next we write our routes
//our routes are going to be in adifferent file thanks to express.router
//so with routes  you can set the common beginning part of the routes e.g '/notes'
//such that any time a user clicks on the routes beginning with  /notes
//the backend fetches the routes specified as the second parameter
//in the function written below
app.use('/notes',require('./routes/notes.js'))
////we are going to have some variables  stored in our .env file to keep them confidential and remmber to add
///them to the .gitignore file
/////when deploying our app the port may change  depending on the one we are assigned to
///that is why during  development we determine our app but duirng production on
///the hosting the port may change hence the  process.env.Port
const port = process.env.Port || 5000
//after  running our routes we are going to listen to for the port
//this function takes in two parmeters the  port and a callback function
app.listen(port,()=>console.log(`server is listening on port ${port}`))
