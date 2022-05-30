var express = require('express');
var cors = require('cors');

var app = express();

//Cors stands for Cross-Origin Resource Sharing. It allows the relaxation of security applied to api.
var corOptions = {
    origin: "http://localhost:8081"
}
// console.log("http://localhost:8081");
// console.log('The project is running');

app.use(cors(corOptions));
//app object is instantiated on creation of express server
//use is a method to configure the middleware used by routes

//parse requests of content type application/json
app.use(express.json());

//
app.use(express.urlencoded({extended: true}));



//simple route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to the world of Node JS!'})
});

// another route
// app.get('/alt-route', (req, res) => {
//     res.json({message: 'An alternate route\'s response.'})
// });




require("./app/routes/tutorialRoutes");

//set port, listens for request
const PORT = process.env.PORT || 8081;

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

require("./app/routes/tutorialRoutes.js")(app);

//Create MySQL Database with WAMPServer
/*
CREATE TABLE IF NOT EXISTS nodejsapi (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(225) NOT NULL,
    description varchar(255),
    published BOOLEAN DEFAULT false);
*/
require('./app/modules/db');