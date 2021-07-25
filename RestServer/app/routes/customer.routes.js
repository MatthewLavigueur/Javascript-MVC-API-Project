
module.exports = app => {
	
	const customer = require("../controllers/customer.controller.js");
	
	// Create
	app.post("/customer", customer.create);
	
	// Get all
	app.get("/customer", customer.getAll);
	
	
	// Get single based on key
	app.get("/customer/:customerId", customer.find);
	
	
	// Delete
	app.delete("/customer/:customerId", customer.delete);
	
	// Update
	//app.put("/customer/:customerid", customer.update);
	
};