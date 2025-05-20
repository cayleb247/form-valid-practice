import "./styles.css";

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const errorMessages = document.querySelectorAll("form p")
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const postalInput = document.getElementById("postal");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-pw");

const zipcodeRegEx = /^\d{5}(-\d{4})?$/;
const zipcodeChecker = new RegExp(zipcodeRegEx, "");

let formValid;

function checkInputs() {
    formValid = true;

    checkRequired();

    checkPassword();

    checkZipcode();
    
    

    return formValid;
}

window.onload = () => {
    inputs[0].onchange = () => {
        checkRequired();
    }
    inputs[1].onchange = () => {
        checkRequired();
    }
    inputs[2].onchange = () => {
        checkRequired();
        checkZipcode();
    }
    inputs[3].onchange = () => {
        checkRequired();
        checkPassword();
    }
    inputs[4].onchange = () => {
        checkRequired();
        checkPassword();
    }
}

function checkRequired() {
    for (let i=0;i<inputs.length;i++) {
        inputs[i].classList.add("submitted");
        if (!inputs[i].checkValidity()) {
            console.log(inputs[i].validationMessage);
            errorMessages[i].textContent = inputs[i].validationMessage;
            errorMessages[i].classList.add("visible");
            formValid = false;
        } else {
            errorMessages[i].textContent = "";
            errorMessages[i].classList.remove("visible");
        }
    }
}

function checkPassword() {
    if (inputs[3].value == "") {
        inputs[3].setCustomValidity("Please fill out this field.");
        errorMessages[3].textContent = inputs[3].validationMessage;
        errorMessages[3].classList.add("visible");
        formValid = false;
    } else {
        inputs[3].setCustomValidity("");
        errorMessages[3].textContent = "";
        errorMessages[3].classList.remove("visible");
    }

    if (inputs[4].value == "") {
        inputs[4].setCustomValidity("Please fill out this field.");
        errorMessages[4].textContent = inputs[4].validationMessage;
        errorMessages[4].classList.add("visible");
        formValid = false;
    } else {
        inputs[4].setCustomValidity("");
        errorMessages[4].textContent = "";
        errorMessages[4].classList.remove("visible");
    }

    if (!(inputs[3].value == inputs[4].value)) {
        inputs[3].setCustomValidity("Does not match.");
        inputs[4].setCustomValidity("Does not match.");
        errorMessages[3].textContent = inputs[3].validationMessage;
        errorMessages[4].textContent = inputs[4].validationMessage;
        errorMessages[3].classList.add("visible");
        errorMessages[4].classList.add("visible");
        formValid = false;
    } else {
        inputs[3].setCustomValidity("");
        inputs[4].setCustomValidity("");
    }
}

function checkZipcode(){
    if (!zipcodeChecker.test(inputs[2].value)) {
        inputs[2].setCustomValidity("Invalid zipcode.");
        errorMessages[2].textContent = "Invalid zipcode.";
        errorMessages[2].classList.add("visible");
        formValid = false;
    } else {
        inputs[2].setCustomValidity("");
        errorMessages[2].textContent = "";
        errorMessages[2].classList.remove("visible");
    }
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (checkInputs()) {
        alert("Form Submitted!");
        form.reset();

        // reset input submission
        for (const input of inputs) {
            input.classList.remove("submitted")
        }
    } 
    
    
})

