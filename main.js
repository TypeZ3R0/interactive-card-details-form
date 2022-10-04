// Getting all the html elements.
const cardForm = document.querySelector(".card-form");
const completeState = document.querySelector(".complete-state");

const cardHolderName = document.querySelector("#cardholder-name");
const cardNumber = document.querySelector("#card-number");
const expMonth = document.querySelector("#exp-month");
const expYear = document.querySelector("#exp-year");
const cvcNo = document.querySelector("#cvc");

const cardImgNumber = document.querySelector(".card-number-over-img");
const cardImgHolderName = document.querySelector(".card-holder-over-img");
const cardImgMonth = document.querySelector(".exp-month-over-img");
const cardImgYear = document.querySelector(".exp-year-over-img");
const cardImgCvc = document.querySelector(".cvc-over-img");

const submitBtn = document.querySelector(".submit-btn");
const continueBtn = document.querySelector("#continue-btn");

// Number of checks
let validationChecks = 0;

// Convert full year to 2 digit year form
const getTwoDigitYearForm = () => {
    const dt = new Date()
    const stringYear = String(dt.getFullYear()).substring(2)
    return Number(stringYear);
}

// Add a space after every 4th character in card number input and update the credit card image with real time value inputs
cardNumber.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^\dA-Z|a-z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    cardImgNumber.textContent = e.target.value;
})

cardHolderName.addEventListener("input", (e) => {
    cardImgHolderName.textContent = e.target.value.toUpperCase();
})

expMonth.addEventListener("input", (e) => {
    cardImgMonth.textContent = e.target.value;
})

expYear.addEventListener("input", (e) => {
    cardImgYear.textContent = e.target.value;
})

cvcNo.addEventListener("input", (e) => {
    cardImgCvc.textContent = e.target.value;
})

// Create an error message
const createError = (errorMessage, input) => {
    const error = document.createElement("h6");
    error.textContent = errorMessage;
    error.style.color = "red";
    input.style.borderColor = "red";
    input.parentElement.appendChild(error);
}

// Check for blank input
const checkForBlankInput = (input) => {
    if(input.value === "") {
        createError("Can't be blank", input);
    }
    else {
        return false;
    }
}

// Check for valid card number
const checkForValidNo = (input, inputField) => {
    if(input.value.length != 19 && input.value.length != 0 && inputField === "card_no") {
        createError("Invalid number", input)
    }
    if(input.value.length != 3 && input.value.length != 0 && inputField === "cvc_no") {
        createError("Invalid number", input)
    }
    else {
        return false
    }
}

// Check for letters in only numbers field
const checkForLetters = (input) => {
    let letters = /[a-zA-Z]+/g;
    if(input.value.match(letters)) {
        createError("Wrong format, numbers only.", input);
    }
    else {
        return false;
    }
}

// Validate expiry date input
const expDurationValidation = (expMonth, expYear) => {
    if(expMonth.value === "" || expYear.value === "") {
        const blankInputError = document.createElement("h6");
        blankInputError.textContent = "Can't be blank";
        blankInputError.style.color = "red";
        expMonth.parentElement.parentElement.appendChild(blankInputError);
    }
    else if (Number(expMonth.value) > 12 || Number(expYear.value) < getTwoDigitYearForm()) {
        const invalidDateError = document.createElement("h6");
        invalidDateError.textContent = "Invalid date";
        invalidDateError.style.color = "red";
        expMonth.parentElement.parentElement.appendChild(invalidDateError);
    }
    else {
        return false;
    }
}

// Validate function
const validate = (checks) => {
    if(checkForBlankInput(cardNumber) === false && checkForValidNo(cardNumber, "card_no") === false && checkForLetters(cardNumber) === false) {
        checks++;
    }
    if(checkForBlankInput(cvcNo) === false && checkForValidNo(cvcNo, "cvc_no") === false && checkForLetters(cvcNo) === false) {
        checks++;
    }
    if(checkForBlankInput(cardHolderName) === false) {
        checks++;
    }
    if(expDurationValidation(expMonth, expYear) === false) {
        checks++;
    }
    return checks;
}

// Submit button behaviour
submitBtn.addEventListener("click", (e) => {
    if(validate(validationChecks) === 4) {
        cardForm.classList.add("hide");
        completeState.classList.remove("hide")
    }
})

// Continue button behaviour
continueBtn.addEventListener("click", () => {
    window.location.reload();
})