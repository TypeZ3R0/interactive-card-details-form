// Getting all the html elements.
const cardHolderName = document.querySelector("#cardholder-name");
const cardNumber = document.querySelector("#card-number");
const expMonth = document.querySelector("#exp-month");
const expYear = document.querySelector("#exp-year");
const cvcNo = document.querySelector("#cvc");

const submitBtn = document.querySelector(".submit-btn");

// Number of checks
let validationChecks = 0;

// Add a space after every 4th character in card number input
cardNumber.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^\dA-Z|a-z]/g, '').replace(/(.{4})/g, '$1 ').trim();
})

// Create an error message
const createError = (error, input) => {
    switch (error) {
        case "blank_input":
                const blankInputError = document.createElement("h6");
                blankInputError.textContent = "Can't be blank";
                blankInputError.style.color = "red";
                input.parentElement.appendChild(blankInputError);
            break;

        case "invalid_cardno":
                const invalidCardError = document.createElement("h6");
                invalidCardError.textContent = "Invalid Card Number";
                invalidCardError.style.color = "red";
                input.parentElement.appendChild(invalidCardError);
            break;

        case "check_letters":
                const lettersError = document.createElement("h6");
                lettersError.textContent = "Wrong format, numbers only.";
                lettersError.style.color = "red";
                input.parentElement.appendChild(lettersError);
            break;

        default:
            break;
    }
}

// Check for blank input
const checkForBlankInput = (input) => {
    if(input.value === "") {
        createError("blank_input", input);
    }
    else {
        return false;
    }
}

// Check for valid card number
const checkForValidCardNo = (input) => {
    if(input.value.length != 19 && input.value.length != 0) {
        createError("invalid_cardno", input)
    }
    else {
        return false
    }
}

// Check for letters in only numbers field
const checkForLetters = (input) => {
    let letters = /[a-zA-Z]+/g;
    if(input.value.match(letters)) {
        createError("check_letters", input);
    }
    else {
        return false;
    }
}

// Validate function
const validate = (checks) => {
    if(!checkForBlankInput(cardNumber) && !checkForValidCardNo(cardNumber) && !checkForLetters(cardNumber)) {
        checks++;
    }
    if(!checkForBlankInput(cvcNo) && !checkForLetters(cvcNo)) {
        checks++;
    }
    if(!checkForBlankInput(cardHolderName)) {
        checks++;
    }
    return checks;
}

// Submit button behaviour
submitBtn.addEventListener("click", () => {
    console.log(validate(validationChecks));
})