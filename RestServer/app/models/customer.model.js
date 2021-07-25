const sql = require("./db.js");

// Constr.
const Customer = function(customer)
{
	this.firstName = customer.firstName;
	this.lastName = customer.lastName;
	this.active = customer.active;
	this.phoneNumber = customer.phoneNumber;
}

Customer.getAll = result => {
	
	sql.query("SELECT * from customer", (err, res) => {
		
		if (err) {
			console.log("Error:", err);
			result(null, err);
			return;
		}
		
		console.log("customer ", res);
		result(null, res);
		
	});
};

Customer.findById = (customerId, result) => {
	
	sql.query(`SELECT * from customer where id = ${customerId}`, (err, res) => {
		
		// A database error.
		if (err) {
			console.log("Error:", err);
			result(null, err);
			return;
		}
		
		// Something was found.
		if (res.length)
		{
			console.log("found customer: ", res[0]);
			result(null, res[0]);
			return;
		}
		
		// Customer was not found.
		console.log("customer was not found");
		result({ kind: "not_found" }, null);
		
	});
};

Customer.disable = (customerId, customer, result) => {
	
	console.log(customerId);
	
	sql.query("UPDATE customer SET active = ? WHERE customerId = ?",
	[customer.active, customerId],
	(err, res) => {
		if(err) {
			console.log("error:", err);
			result(null, err);
			return;
		}
		
		if(res.affectedRows == 0) {
			
			result({ kind: "not_found"}, null);
			return;
		}
		
		console.log("Updated customer: ", {customerId: customerId, ...customer});
		result(null, {customerId: customerId, ...customer});
	});
};
	
Customer.insert = (newCustomer, result) => {

	sql.query("INSERT INTO Customer SET ?", newCustomer, (err, res) => {
		if(err) {
			console.log("error:", err);
			result(null, err);
			return;
		}
		
		console.log("Created customer: ", {customerId: res.insertId, ...newCustomer});
		
		result(null, {customerId: res.insertId, ...newCustomer});
		
	});
};
module.exports = Customer;