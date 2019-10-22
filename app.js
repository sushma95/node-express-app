// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')  // HTTP security
const path = require('path');   
const router = express.Router();


// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())

app.use(express.static(path.join(__dirname, 'public')))

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get("hostname")
const port = process.env.PORT || config.get("port");

// Use Express app.get() methods to configure endpoints

// declare your callback function the old way
app.get('/', function (req, res) {
  res.send('<h1>Rendering html page using Express</h1><br> <br>' +
  '<h2>Welcome to dogs page </h2><br></br>'+
  'Click the below link to find out the list of various dog breeds <br>'+
  '<a href="dogs-page">dog breeds</a>'
    
  )
})

app.get('/dogs-page',function(req,res){
  res.sendFile('/index.html',{root: path.join(__dirname, 'public')
})
  //__dirname : It will resolve to your project folder.
});
// or use the new arrow function syntax
// respond with text
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

// or respond with html
app.get('/big', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// or respond with JSON
app.get('/json', (req, res) => {
  res.send('{"name" : "Nandini"}')
})

// :name indicates a parameter at this location in the URI
app.get('/greeting/:id', (req, res) => {
  res.send(`Hello! The id provided was ${req.params.id}.`)
})

// combine your skills and get creative
app.get('/yo/:buddy', (req, res) => {
  res.send(`<h1>Yo, ${req.params.buddy}!</h1>`)
})

// provide multiple query parameters with ? and &
app.get('/fancy', (req, res) => {
  const first = req.query.first
  const last = req.query.last
  res.send(`Hello ${first} ${last}!`)
})

// Use middleware to handle all non-managed routes (e.g. /xyz)
// https://expressjs.com/en/api.html#req.originalUrl
app.use((req, res, next) => {
  res.status(404).send(`status 404 - ${req.originalUrl} was not found`);
})

// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /dogs-page`)
  console.log(`   Try /hello`)
  console.log(`   Try /big`)
  console.log(`   Try /json`)
  console.log(`   Try /greeting/yourname`)
  console.log(`   Try /yo/Dr.Rogers`)
  
  console.log(`   Try /fancy/?first=Denise&last=Case`)
  console.log('\n Hit CTRL-C CTRL-C to stop\n')
})

