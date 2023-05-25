const express = require("express");
const app = express();
const webPages = require("./routes/webPageRoutes.js")
const APIs = require("./routes/apiRoutes.js")

const path = require("path"); 



// View engine setup
app.set('view engine', 'ejs')

// app config
app.use(express.static(path.join(__dirname, 'public')))


// load frontend pages routes
app.use('/', webPages )


// load APIs
app.use(express.json());
app.use('/api/v1', APIs)





app.listen(process.env.PORT || 4800, () => {
  console.log("Server is live!");
});
