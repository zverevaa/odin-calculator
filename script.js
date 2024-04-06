let firstNum = 0;
let secondNum = 0;
let operator = "";
let displayNum = "";

const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
display.textContent = "0";

const getDigit = (digit) => {
    displayNum = makeDisplay(displayNum, digit.dataset.digit);
    display.textContent = displayNum;
};

const makeDisplay = (displayNum, digit) => {
    return (displayNum += digit);
};

//Clear display

const clearDisplay = () => {
    displayNum = "";
    display.textContent = "0";
};
const clear = document.querySelector(".clear");
clear.addEventListener("click", clearDisplay);

digits.forEach((digit) =>
    digit.addEventListener("click", () => getDigit(digit))
);

const add = (a, b) => {
    return a + b;
};

const substract = (a, b) => {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

const divide = (a, b) => {
    return a / b;
};

const operate = (a, b, operator) => {
    switch (operator) {
        case "+":
            add(a, b);
            break;
        case "-":
            substract(a, b);
            break;
        case "*":
            multiply(a, b);
            break;
        case "/":
            divide(a, b);
    }
};
