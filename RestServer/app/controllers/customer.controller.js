const Customer = require("../models/customer.model.js");

exports.getAll = (req, res) =>
{
	Customer.getAll((err, data) => {
		
		if (err)
			res.status(500).send({
			message: "Error occurred on the server."
			});
		else
			res.send(data);
	});
};

exports.find = (req, res) => {
	Customer.findById(req.params.customerId,  (err, data) => {
		if (err) {
			if (err.kind === "not_found") 
			{
				res.status(404).send({
				message: "Record not found" });
			} else
			{
				res.status(500).send({
				message: "Error occurred on the server."
				});
			}
		}
		else
		{
			res.send(data);
		}
	});
};

// This resembles an update.
exports.delete = (req, res) => {

	console.log("DELETE1");


	if (!req.body) {
		
		console.log("DELETE: BODY NOT FOUND");
		res.status(400).send({message:"Body cannot be empty"});
	}
	
	console.log("DELETE2");
	
	Customer.disable(
		req.params.customerId, 
		new Customer(req.body),
		(err, data) => {
			if(err) {
				if(err.kind === "not_found")
				{ res.status(404).send({message: `Customer not found with ID ${req.params.customerId}.` });
				} else {
					res.status(500).send({ message: `Error updating or disabling customer with ID ${req.params.customerId}`});
				}
			} else {
				
				res.send(data);
			}
		}
	);
};

exports.create = (req, res) => {
	
	console.log("AAA");
	
	if (!req.body) {
		res.status(400).send({message:"Body cannot be empty"});
	}
	
	// Create a customer object to be used to insert with.
	const customer = new Customer({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		active: req.body.active,
		phoneNumber: req.body.phoneNumber
	});
		
	Customer.insert(customer, (err, data) => {
		
		if (err)	
		{
			res.status(500).send({ message: `Error inserting new customer.`});
		}
		else
		{
			res.send(data);
		};
	});
};
	