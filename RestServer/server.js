  
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));



require("./app/routes/customer.routes.js")(app);



const PORT = 3000;

app.listen(PORT, () => {
	
	console.log("Server listening on port " + PORT);
	
});