  

  
   
   //created elements
    const TABLE = "table";
    const DIV = "div";

    //table header constants
    const TABLEHEADNAME = "Full Name";
    const TABLEHEADPHONE = "Number";
    const TABLEHEADACTION = "Action";
    //HTML IDS
    const TABLEID = "tableParent";
    const FIRSTNAMEID = "FName";
    const LASTNAMEID = "LName";
    const PHONENUMBERID = "Phone";
    const BUTTONTEXT = "DELETE";
    //Array for storing User inputs
    let contactInformationArray = []; // store user inputs in empty array

    function contactInformation(firstNameField,lastNameField,phoneNumberField) //class for objects
    {

        this.firstNameField = firstNameField;
        this.lastNameField = lastNameField;
        this.phoneNumberField = phoneNumberField;
        this.fullName = firstNameField + " " + " " + lastNameField;//concat first and last name

    }

   
            //div stuff
            let div = document.createElement(DIV);
                div.setAttribute("class","container mt-1") //bootstrap style
                // div1.setAttribute("class","text-center")
                document.body.appendChild(div);

            let table = document.createElement(TABLE); //creat table element
                table.setAttribute("id",TABLEID); //set id for table
                table.setAttribute("class","table table-striped mt-2")//bootstrap style
           
                document.body.appendChild(table); //append table to body of DOM
           
            let tableHeaderArray = [TABLEHEADNAME,TABLEHEADPHONE,TABLEHEADACTION]; //table head with constants
                table = document.getElementById(TABLEID);
            
            let header = table.createTHead();
                div.appendChild(table);//append table into div

                for(var i=0; i < tableHeaderArray.length; i++)//loop through header array for precision and future additions
                {
                    let tableHeader = document.createElement("th");
                        tableHeader.textContent = tableHeaderArray[i];
                        header.appendChild(tableHeader);
                        
                }
        
        
function addContact(){


    
    //get elements and user fields       
    let table = document.getElementById(TABLEID);
    let firstNameField = document.getElementById(FIRSTNAMEID);
    let lastNameField  = document.getElementById(LASTNAMEID);
    let phoneNumberField  = document.getElementById(PHONENUMBERID);
    let fullName = firstNameField.value + " " + " " + lastNameField.value;

                //create object
    
        contactInformationArray.push(new contactInformation(firstNameField.value,lastNameField.value,phoneNumberField.value,fullName));
   
        contactInformation[0] = fullName; //concatinate firstname and lastanme inputs into a single table column
        contactInformation[1] = phoneNumberField.value;
        firstNameField.value = ""; //reset textbox field inputs upon "onclick" function
        lastNameField.value = "";
        phoneNumberField.value = "";

                //create table row

        tableRow = document.createElement('tr');
        table.appendChild(tableRow);

                for(var i=0; i<2; i++) //create table data and insert userinputs
                {
                    let tableData = document.createElement('td');
                        tableData.textContent = contactInformation[i];
                        tableRow.appendChild(tableData);                                               
                }
                    let tableData = document.createElement('td');
                    let button = document.createElement('button');
                        button.textContent = BUTTONTEXT;
                        button.onclick = function() {deleteRow(this)};
                        button.setAttribute("class","btn btn-primary btn-block mt-2")
                        tableData.appendChild(button);
                        tableRow.appendChild(tableData);
                        //display errormsg for validation
    // errorMessage();
                        
}

function deleteRow(buttonObj) {
    
    var thisRowIndex = buttonObj.parentNode.parentNode.rowIndex;

   document.getElementById(TABLEID).deleteRow(thisRowIndex); 
   let deletedData = contactInformationArray.splice(thisRowIndex,1);
   
   //checking to see process of table row deletion 
    console.log("position deleted"); 
    console.log(thisRowIndex);
    console.log("object deleted");
    console.log(deletedData);
    console.log("new array");
    console.log(contactInformationArray);                                                                                                                 

}  


//radio button functions
function ascending(){

    result = document.querySelector('input[name="ascending"]:checked').value;//if radio is checked call that radio button ASCENDING
    console.log(result);
    if(result == "LastName") //last name checked auto
    {
        sortAscendingLastName(); 
    }else{
        sortAscendingFirstName();
    }
    
}

function descending(){

    result = document.querySelector('input[name="ascending"]:checked').value;//if radio is checked call that radio button DESCENDING
    console.log(result);
    if(result == "LastName")//last name checked auto
    {
        sortDescendingLastName();
    }else{
        sortDescendingFirstName();
    }
  
}
//nested functions to call on the sorting funcitons
function sortAscendingFirstName()
{
    contactInformationArray.sort(sortAscendingFirst); //sort
        deleteTable(); //delete
        drawTableFromObjectArray(); //refresh
} 

function sortAscendingLastName()
{
    contactInformationArray.sort(sortAscendingLast);//sort
        deleteTable(); //delete
        drawTableFromObjectArray();//refresh
}

function sortDescendingLastName()
{   
    contactInformationArray.sort(sortDescendingLast)//sort
        deleteTable();//delete
        drawTableFromObjectArray();//refresh
}

function sortDescendingFirstName()
{   
    contactInformationArray.sort(sortDescendingFirst)//sort
        deleteTable();//delete
        drawTableFromObjectArray();//refresh
}

function sortAscendingFirst(a,b)
{    //sort objects acending by first name
                if( a.firstNameField.toUpperCase() == b.firstNameField.toUpperCase() ) //too uppercase for sorting accuracy 
                {
                    return 0;
                }
                if( a.firstNameField.toUpperCase()  > b.firstNameField.toUpperCase() ) 
                {
                    return +1;
                }
                return -1;                          
}

function sortDescendingFirst(a,b)
{       //sort objects descending by first name
                if( a.firstNameField.toUpperCase() == b.firstNameField.toUpperCase() )
                {
                    return 0;   
                }
                if( a.firstNameField.toUpperCase()  < b.firstNameField.toUpperCase() ) 
                {
                    return +1;
                }
                return -1;                         
}

function sortAscendingLast(a,b)
{     //sort objects ascending by last name
                if( a.lastNameField.toUpperCase() == b.lastNameField.toUpperCase() )
                {
                    return 0;                    
                }
                if( a.lastNameField.toUpperCase() > b.lastNameField.toUpperCase() ) 
                {
                    return +1;
                }
                return -1;                          
}

function sortDescendingLast(a,b)
{       //sort objects descending by last name
                if( a.lastNameField.toUpperCase() == b.lastNameField.toUpperCase() )
                {
                    return 0;                  
                }
                if( a.lastNameField.toUpperCase() < b.lastNameField.toUpperCase() ) 
                {
                    return +1;
                }
                return -1;                          
}
    
function deleteTable()
{           //get table Id
            table = document.getElementById(TABLEID)  //call table    
            var numRows = table.rows.length; //insert into variable
            for( var i = 0;i < numRows; i++ )//for loop to delete row zero
            {
                table.deleteRow(0);
            }
}

function drawTableFromObjectArray(){

    for(var i = 0; i < contactInformationArray.length; i++) //for loop to re-draw table after delete and sort
    {   
        //create table row
        tableRow = document.createElement('tr');
        //create table data 
        tableData = document.createElement('td');
        tableData.textContent = contactInformationArray[i].fullName ; //insert concatinated name into column at position zero
        //create table data
        tableData1 = document.createElement('td');
        tableData1.textContent = contactInformationArray[i].phoneNumberField;//insert phone number
        //create table data
        tableData2 = document.createElement('td');
        button = document.createElement('button'); //create button
        button.setAttribute("class","btn btn-primary btn-block mt-2")
        tableData2.appendChild(button); //append to table data
        button.textContent = BUTTONTEXT; //add text to button
        //append table data to rows
        tableRow.appendChild(tableData);
        tableRow.appendChild(tableData1);
        tableRow.appendChild(tableData2);
        table.appendChild(tableRow);//append table row to table    
        button.onclick = function() {deleteRow(this)}; //make sure delete function is being used on click    
    }

}

function capitalize(){  
    
      deleteTable();//delete table
      drawCapitalizedTable();//refresh with capital letters
  }
  //check for duplicate data
function dup(){
    //area to display information
    var displayArea = document.getElementById("duplicateFound");//message for dups

    var fullName1;
    var fullname2;
    var counter=0;
    displayArea.innerHTML = Date();//date moethod just for looks
    displayArea.innerHTML = displayArea.innerHTML+("<br>");
  
  //if the table data/rows is less than two display this message
    if(contactInformationArray.length < 2)
    {
        displayArea.innerHTML = displayArea.innerHTML+("requires 2 or more results")
        displayArea.innerHTML = displayArea.innerHTML+("<br><button onclick=\"clearRes()\">Clear</button>");//clear button
        return;
    }

    //loop starting from table row position ZERO and look at position ONE, if no match, check pos ZERO with pos TWO etc...
for(let i= 0; i < contactInformationArray.length -1 ; i++)
{   
    fullName1 = contactInformationArray[i].fullName;
    for( let j = i+1; j < contactInformationArray.length ; j++)//same as above, but start at pos ONE and continue....start at TWO etc...
    {
        fullname2 = contactInformationArray[j].fullName;
        
        if(fullName1 == fullname2){//display information
            displayArea.innerHTML = displayArea.innerHTML+(`${fullName1} is a duplicate in rows ${i} and ${j}`);//display the matched table data
            displayArea.innerHTML = displayArea.innerHTML+("<br>");
            counter++;//count rows
        }
    }
}
displayArea.innerHTML = displayArea.innerHTML+"<br>";
displayArea.innerHTML = displayArea.innerHTML+ `${counter} instances found `;//display the matched row
displayArea.innerHTML = displayArea.innerHTML+("<br><button onclick=\"clearRes()\">Clear</button>");

}

function clearRes(){
    var displayArea = document.getElementById("duplicateFound");
    displayArea.innerHTML = "";
}

  //capitilize the first letter of each object function
  function drawCapitalizedTable(){
  
      for(var i = 0; i < contactInformationArray.length; i++) //for loop to re-draw table after delete and sort
      {   
          //create table row
          tableRow = document.createElement('tr');
          //create table data 
          tableData = document.createElement('td');
          tableData.textContent = //capitilize first letter of first and last name
          contactInformationArray[i].firstNameField.substr(0,1).toUpperCase()
            +     contactInformationArray[i].firstNameField.slice(1)
            +" "+ contactInformationArray[i].lastNameField.substr(0,1).toUpperCase()
            +     contactInformationArray[i].lastNameField.slice(1);
  
          tableData1 = document.createElement('td');
          tableData1.textContent = contactInformationArray[i].phoneNumberField;//insert phone number
          //create table data
          tableData2 = document.createElement('td');
          button = document.createElement('button'); //create button
          button.setAttribute("class","btn btn-primary btn-block mt-2") //bootstrap style
          tableData2.appendChild(button); //append to table data
          button.textContent = BUTTONTEXT; //add text to button
          //append table data to rows
          tableRow.appendChild(tableData);
          tableRow.appendChild(tableData1);
          tableRow.appendChild(tableData2);
          table.appendChild(tableRow);//append table row to table
       
          button.onclick = function() {deleteRow(this)}; //make sure delete function is being used on click       
      }  
  }

  //Validate User Fields
function userInputValidation()
{
    //get new variables
   var firstNameInput = document.getElementById("FName").value;
   var lastNameInput = document.getElementById("LName").value;
   var phoneNumberInput = document.getElementById("Phone").value;
   var number = /[0-9]/; //regex for numeric inputs

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
        else if(isNaN(phoneNumberInput))
        {
            error.innerHTML = "PHONE MUST BE NUMERIC";  
            error.style.color = "red";        
            return; 

        } //if all conditions are met, add contact
            addContact();
            error.innerHTML = "CONTACT ADDED";
            error.style.color = "lime"; 
            error.style.animation = "3s";
           
            return;
    
}
