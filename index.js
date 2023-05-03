const express = require("express");
const app = express();
const dotenv = require("dotenv");
const webPages = require("./routes/webPageRoutes.js")
const APIs = require("./routes/apiRoutes.js")

const path = require("path"); 
const fileURLToPath = require("url");

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

// View engine setup
app.set('view engine', 'ejs')

// app config
app.use(express.static(path.join(__dirname, 'public')))


// load frontend pages routes
app.use('/', webPages )


// load APIs
app.use(express.json());
app.use('/api', APIs)



// DB Connection setup (*not yet done)




app.listen(process.env.PORT || 4800, () => {
  console.log("Server is live!");
});
