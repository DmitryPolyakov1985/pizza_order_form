var smallPizzaPrice = 4.00;
var mediumPizzaPrice = 5.00;
var largePizzaPrice = 7.00;
var toppingPrice = 0.50;
var PST = 0.07;
var GST = 0.07;
var pstToPay = 0;
var gstToPay = 0;
var subTotal = 0;
var total = 0;
var numOfCheckedToppings;
var form = document.forms["myForm"];
var checkedPizza;

//function to count number of toppings checked by user
function toppingsChecked(form) {
    numOfCheckedToppings = 0;
    form = document.forms["myForm"];
    for(var i = 0; i < form.elements.length; i++) {
        if(form.elements[i].type == "checkbox" && form.elements[i].checked) {
            numOfCheckedToppings++;
        }
    }
    return numOfCheckedToppings; 
}

//function to find what pizza was checked
function findCheckedPizza(form) {
    form = document.forms["myForm"];
    for(var i = 0; i < form.elements.length; i++) {
        if(form.elements[i].type == "radio" && form.elements[i].checked) {
            checkedPizza = form.elements[i].value;            
        }
    }
    return checkedPizza; 
}

//function to calculate subTotal amount depending on what pizza size was checked by user and fill text box in
function calculateSubTotal() {
    if (checkedPizza == 10) {
        subTotal = smallPizzaPrice + (numOfCheckedToppings * toppingPrice);
    } else if (checkedPizza == 12) {
        subTotal = mediumPizzaPrice + (numOfCheckedToppings * toppingPrice);
    } else if (checkedPizza == 15) {
        subTotal = largePizzaPrice + (numOfCheckedToppings * toppingPrice);
    }
    document.forms["myForm"].elements['SubTotal_tb'].value = subTotal.toFixed(2);
}

//function to calculate GST to pay and fill text box in
function calculateGstToPay() {
    gstToPay = Math.round(subTotal * GST * 100) / 100;
    document.forms["myForm"].elements['GST_tb'].value = gstToPay.toFixed(2);
}

//function to calculate PST to pay and fill text box in
function calculatePstToPay() {
    pstToPay = Math.round(subTotal * PST * 100) / 100;
    document.forms["myForm"].elements['PST_tb'].value = pstToPay.toFixed(2); 
}

//function to calculate total amount and fill text box in
function calculateTotalAmount() {
    totalAmount = parseFloat(subTotal + pstToPay + gstToPay);
    document.forms["myForm"].elements['Total_tb'].value = totalAmount.toFixed(2);
}

//function to validate the form
function validateForm() {
    //assume we don't have any errors. set variable to true
    var okay = true;
    //declare variable for a message to alert if some errors are found
    var message = "";
    
    
    //check if First Name is filled in
    if(document.forms['myForm'].elements['FirstName_tf'].value == null || document.forms['myForm'].elements['FirstName_tf'].value == "") {
        okay = false;
        document.getElementById("firstNameInput").setAttribute('class', 'redWarning');
        document.getElementById("nameRequired").innerHTML = " *this field is required.";
    } else {
        document.getElementById("firstNameInput").removeAttribute('class', 'redWarning');
        document.getElementById("nameRequired").innerHTML = "";
    }
    
    //check if Last Name is filled in
    if(document.forms['myForm'].elements['LastName_tf'].value == null || document.forms['myForm'].elements['LastName_tf'].value == "") {
        okay = false;
        document.getElementById("lastNameInput").setAttribute('class', 'redWarning');
        document.getElementById("lastNameRequired").innerHTML = " *this field is required.";
    } else {
        document.getElementById("lastNameInput").removeAttribute('class', 'redWarning');
        document.getElementById("lastNameRequired").innerHTML = "";
    }
    
    //check if Address is filled in
    if(document.forms['myForm'].elements['Address_tf'].value == null || document.forms['myForm'].elements['Address_tf'].value == "") {
        okay = false;
        document.getElementById("addressInput").setAttribute('class', 'redWarning');
        document.getElementById("addressRequired").innerHTML = " *this field is required.";
    } else {
        document.getElementById("addressInput").removeAttribute('class', 'redWarning');
        document.getElementById("addressRequired").innerHTML = "";
    }
    
    //check if Phone Number is filled in
    if(document.forms['myForm'].elements['Phone_tf'].value == null || document.forms['myForm'].elements['Phone_tf'].value == "") {
        okay = false;
        document.getElementById("phoneNumInput").setAttribute('class', 'redWarning');
        document.getElementById("phoneNumRequired").innerHTML = " *this field is required.";
    } else if(isNaN(document.forms['myForm'].elements['Phone_tf'].value)) {
        document.getElementById("phoneNumInput").setAttribute('class', 'redWarning');
        document.getElementById("phoneNumRequired").innerHTML = " *phone number should have numbers only.";
    } else {
        document.getElementById("phoneNumInput").removeAttribute('class', 'redWarning');
        document.getElementById("phoneNumRequired").innerHTML = "";
    }
    
    //check if Email is filled in and if filled in checks validity with regular expressions
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(document.forms['myForm'].elements['Email_tf'].value == null || document.forms['myForm'].elements['Email_tf'].value == "") {
        okay = false;
        document.getElementById("emailInput").setAttribute('class', 'redWarning');
        document.getElementById("emailRequired").innerHTML = " *this field is required.";
    } else if (!pattern.test(document.forms['myForm'].elements["Email_tf"].value)) {
        okay = false;
        document.getElementById("emailInput").setAttribute('class', 'redWarning');
        document.getElementById("emailRequired").innerHTML = " *you have entered an invalid email address.";      
    } else {
        document.getElementById("emailInput").removeAttribute('class', 'redWarning');
        document.getElementById("emailRequired").innerHTML = "";
    }
    
    //check if radio button checked
    //declare variable assuming no radio buttons checked
    var radioBtnChecked = false;
    //declare variable for radio button group
    var pizzaSize = document.forms['myForm'].elements['Size_rg'];
    //loop through all radio buttons to see if any of them is checked
    for(var i = 0; i < pizzaSize.length; i++) {
        if(pizzaSize[i].checked) {
            radioBtnChecked = true;
            document.getElementById("pizzaSizeRequired").innerHTML = "";
        }        
    }
    //if no checked radio buttons found, radioBtnSelected is still false, user need to be alerted
    if(!radioBtnChecked) {
        okay = false;
        document.getElementById("pizzaSizeRequired").innerHTML = " *pizza size is required.";
        //message += "Please choose your pizza size.\n";
    }
    
    //check if payment option is selected
    //declare variable for payment select
    var paymentSelect = document.getElementById("Payment_menu");
    //get selected index of the option
    var index = paymentSelect.selectedIndex;
    if(index == 0) {
        okay = false;
        document.getElementById("paymentOptionRequired").innerHTML = " *payment option is required.";
        //message += "Please select payment method.\n";
    } else {
        document.getElementById("paymentOptionRequired").innerHTML = "";
    }

    //if no errors found okay is true, submit form
    return okay;   
}

























