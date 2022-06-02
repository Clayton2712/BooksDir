var express = require('express');
var cors = require('cors');

var app = express();

//Cors stands for Cross-Origin Resource Sharing. It allows the relaxation of security applied to api.
var corOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corOptions));
//app object is instantiated on creation of express server
//use is a method to configure the middleware used by routes

//parse requests of content type application/json
app.use(express.json());

app.use(express.urlencoded({extended: true}));

//simple route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to the world of Node JS!'})
});

//Set source of routes
require("./app/routes/booksDirRoutes");

//set port, listens for request
const PORT = process.env.PORT || 8081;

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

require("./app/routes/booksDirRoutes.js")(app);


require('./app/models/db');