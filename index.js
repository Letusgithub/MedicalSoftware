const express = require("express");
const path = require("path"); 

const webPages = require("./src/routes/webPageRoutes")
const APIs = require("./src/routes/apiRoutes.js")
const {initialisePool} = require("./src/config/database.js");

const app = express();

// View engine setup
app.set('view engine', 'ejs')
app.use(express.json());


// Set the directory path for views
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'public')))

// load frontend pages routes
app.use('/', webPages )

// load APIs
app.use('/api/v1', APIs)


initialisePool().then(()=>{
  app.listen(process.env.PORT || 4800, () => {
    console.log("Server is live!");
  });  
})
