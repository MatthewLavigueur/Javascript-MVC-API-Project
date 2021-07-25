const sql = require("./db.js");

// Constr.
const Phone = function(phone)
{
	this.phoneNumber = phone.phoneNumber;

}

Phone.getAll = result => {
	
	sql.query("SELECT * from phone", (err, res) => {
		
		if (err) {
			console.log("Error:", err);
			result(null, err);
			return;
		}
		
		console.log("phone ", res);
		result(null, res);
		
	});
};

Phone.findById = (phoneId, result) => {
	
	sql.query(`SELECT * from phone where id = ${phoneId}`, (err, res) => {
		
		// A database error.
		if (err) {
			console.log("Error:", err);
			result(null, err);
			return;
		}
		
		// Something was found.
		if (res.length)
		{
			console.log("found phone: ", res[0]);
			result(null, res[0]);
			return;
		}
		
		// Phone was not found.
		console.log("phone was not found");
		result({ kind: "not_found" }, null);
		
	});
};

module.exports = Phone;