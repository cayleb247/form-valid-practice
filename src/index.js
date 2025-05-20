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

function checkInputs() {
    let formValid = true;

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

    
    if (inputs[3].value == "") {
        alert("input 3 has nothing!");
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

    return formValid;
}

window.onload = () => {
    inputs[2].onchange = () => {
        if (!zipcodeChecker.test(inputs[2].value)) {
            inputs[2].setCustomValidity("Invalid zipcode.");
        } else {
            inputs[2].setCustomValidity("");
        }
    }
    inputs[3].onchange = () => {
        if (!(inputs[3].value == inputs[4].value)) {
            inputs[3].setCustomValidity("Does not match.");
            inputs[4].setCustomValidity("Does not match.");
        } else {
            inputs[3].setCustomValidity("");
            inputs[4].setCustomValidity("");
        }
    }
    inputs[4].onchange = () => {
        if (!(inputs[3].value == inputs[4].value)) {
            inputs[3].setCustomValidity("Does not match.");
            inputs[4].setCustomValidity("Does not match.");
        } else {
            inputs[3].setCustomValidity("");
            inputs[4].setCustomValidity("");
        }
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

