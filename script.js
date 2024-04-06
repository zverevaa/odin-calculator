let firstNum = null;
let secondNum = null;
let prevOperator = "";
let operator = "";
let displayNum = "";

const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
display.textContent = "0";
const operators = document.querySelectorAll(".operator");

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
    if (firstNum === null) {
        firstNum = parseInt(displayNum);
        a = firstNum;
        clearDisplay();
    } else {
        secondNum = parseInt(displayNum);
        b = secondNum;
    }
    if (prevOperator === "") {
        prevOperator = operator;
    } else {
        switch (prevOperator) {
            case "+":
                firstNum = add(a, b);
                break;
            case "-":
                firstNum = substract(a, b);
                break;
            case "*":
                multiply(a, b);
                break;
            case "/":
                divide(a, b);
        }
        prevOperator = operator;
    }

    clearDisplay();
    display.textContent = firstNum;

    console.log(firstNum);
};

operators.forEach((operator) =>
    operator.addEventListener("click", () =>
        operate(firstNum, secondNum, operator.textContent)
    )
);
