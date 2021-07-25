//URL
const CUSTOMERURL ="http://127.0.0.1:3000/customer";
//created elements
const TABLE = "table";
 const DIV = "div";   
 //table header constants
 const TABLEHEADID = "Customer Id";
 const TABLEHEADNAME = "Full Name";
 const TABLEHEADPHONE = "Number";
 const TABLEHEADACTIVE = "Active";
 //HTML IDS
 const TABLEID = "tableParent";
 const FIRSTNAMEID = "FName";
 const LASTNAMEID = "LName";
 const PHONENUMBERID = "Phone";
 const BUTTONTEXT = "DELETE";

                                                        //CREATE TABLE HEADER
         //div stuff
         let div = document.createElement(DIV);
             div.setAttribute("class","container mt-1") //bootstrap style
             // div1.setAttribute("class","text-center")
             document.body.appendChild(div);

         let table = document.createElement(TABLE); //creat table element
             table.setAttribute("id",TABLEID); //set id for table
             table.setAttribute("class","table table-striped mt-2")//bootstrap style
        
             document.body.appendChild(table); //append table to body of DOM
        
         let tableHeaderArray = [TABLEHEADNAME,TABLEHEADPHONE,TABLEHEADID,TABLEHEADACTIVE]; //table head with constants
             table = document.getElementById(TABLEID);
         
         let header = table.createTHead();
             div.appendChild(table);//append table into div

             for(var i=0; i < tableHeaderArray.length; i++)//loop through header array for precision and future additions
             {
                 let tableHeader = document.createElement("th");
                     tableHeader.textContent = tableHeaderArray[i];
                     header.appendChild(tableHeader);                            
             }

function getData() {

 const url = CUSTOMERURL;

let table = document.getElementById(TABLEID);  
var firstName = document.getElementById(FIRSTNAMEID);
var lastName = document.getElementById(LASTNAMEID);
var phoneNumber = document.getElementById(PHONENUMBERID);
var deactivateCustomerId = document.getElementById("inp_delete_id");

//reset input fields upon page refresh and insert
firstName.value = "";
lastName.value = "";
phoneNumber.value = "";
deactivateCustomerId.value = "";

 fetch(url).then(data => data.json())
 .then((json) => {

     for (customer in json)
     {      //create table row
                tableRow = document.createElement('tr');
            //customer Id data creation
                let tableData3 = document.createElement('td');
                tableData3.textContent = json[customer].customerId;
            //create table data for database info
                let tableData = document.createElement('td');
            //customer full name
                tableData.textContent = json[customer].firstName + " " + json[customer].lastName;
            //phone number
                let tableData1 = document.createElement('td');
                tableData1.textContent = json[customer].phoneNumber;
            //active 
                let tableData2 = document.createElement('td');
                tableData2.textContent = json[customer].active;
            //append to table row         
                tableRow.appendChild(tableData);
                tableRow.appendChild(tableData1);
                tableRow.appendChild(tableData3);
                tableRow.appendChild(tableData2);               
            //append to table
                table.appendChild(tableRow);               
     }             
 })      
}    

document.addEventListener('DOMContentLoaded', 
 function() {getData();}, false); 

function add() {

const url = CUSTOMERURL;
var firstName = document.getElementById(FIRSTNAMEID).value;
var lastName = document.getElementById(LASTNAMEID).value;
var phoneNumber = document.getElementById(PHONENUMBERID).value;

// Active always 1 for new records.
var data = {firstName: firstName, lastName: lastName, phoneNumber:phoneNumber, active: "1"};

fetch(
    url,
    {
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data),
        method: "POST"
    }
).then(data => data.json())
.then((json) => { 

        if(json.message)
        {
            document.getElementById("result").innerHTML = json.message;
        }
        else
        {
            var response = `Contact Added, The ID Is ${json.customerId}!`;
          
            response += "<br>";
            response += "Other details: " + json.firstName+"  "+json.lastName+" "+json.phoneNumber;
            // response += "Other details: " + JSON.stringify(json);

            document.getElementById("result").innerHTML = response;
        }
  })
};

function deactivate() {

//target input fields
var customerId = document.getElementById("inp_delete_id").value;
const url = `http://127.0.0.1:3000/customer/${customerId}`;
var data = {active: "0"};


fetch(
    url,
    {
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data),
        method: "DELETE"
    }
).then(data => data.json())
.then((json) => { 

        if(json.message)
        {
            document.getElementById("deleteResult").innerHTML = json.message;
        }
        else
        {
            document.getElementById("deleteResult").innerHTML = "Deactivated!"; // + JSON.stringify(json);
        }
  })
};

function activate() {

    var customerId = document.getElementById("inp_delete_id").value;
    const url = `http://127.0.0.1:3000/customer/${customerId}`;
    var data = {active: "1"};

    fetch(
        url,
        {
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data),
            method: "DELETE"
        }
    ).then(data => data.json())
    .then((json) => { 
    
            if(json.message)
            {
                document.getElementById("activeResult").innerHTML = json.message;
            }
            else
            {
                document.getElementById("activeResult").innerHTML = "Activated!"; // + JSON.stringify(json);
            }
      })
    };

                                                    //VALIDATION
//mask for phone number
$(document).ready(function() {
    $("#Phone").inputmask({ mask: "(999) 999-9999" });
    $(":input").inputmask();
    });

function userInputValidation()
{
//get new variables
var firstNameInput = document.getElementById("FName").value;
var lastNameInput = document.getElementById("LName").value;
var phoneNumberInput = document.getElementById("Phone").value;
var number = /[0-9]/; //regex for numeric inputs
var checkPhone =/^((\\(\\d{3}\\))|\\d{3})[- ]?\\d{3}[- ]?\\d{4}$/;//regex for phone number incase mask is removed

if(firstNameInput == "")//check against empty string
{
    error.innerHTML = "FIRST NAME FIELD MUST NOT BE EMPTY";  //error message
    error.style.color = "red";    
    return; //if false check statment again
}
else if(number.test(firstNameInput)) //check if input contains an integer
{
    error.innerHTML = "FIRST NAME MUST NOT CONTAIN NUMERIC VALUES";  
    error.style.color = "red"; 
    return; 
}
else if(lastNameInput == "")
{
    error.innerHTML = "LAST NAME FIELD MUST NOT BE EMPTY"; 
    error.style.color = "red";          
    return; 
}
else if(number.test(lastNameInput))
{
    error.innerHTML = "LAST NAME MUST NOT CONTAIN NUMERIC VALUES";  
    error.style.color = "red";         
    return; 
}
else if(phoneNumberInput == "")
{
    error.innerHTML = "PHONE FIELD MUST NOT BE EMPTY"; 
    error.style.color = "red";           
    return;      
}
else if(checkPhone.test(phoneNumberInput))
{
    error.innerHTML = "PHONE MUST MATCH (XXX)XXX-XXXX";  
    error.style.color = "red";        
    return; 

} //if all conditions are met, add contact
    add();
    error.innerHTML = "CONTACT ADDED";
    error.style.color = "lime"; 
    error.style.animation = "3s";
   
    return;

}
