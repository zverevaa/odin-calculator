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
clear.addEventListener("click", () => {
    clearDisplay();
    firstNum = null;
    secondNum = null;
    display.classList.remove("you-died");
});

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

const percentage = (a, b) => {
    let num = (a / 100) * b;
    console.log(num);
    return (a / 100) * b;
};

const operate = (a, b, operator) => {
    if (a === null && operator === "=") return; //Checks if there's anything to calculate

    if (firstNum === null) {
        firstNum = parseInt(displayNum);
        a = firstNum;
        clearDisplay();
    } else {
        secondNum = parseInt(displayNum);
        b = secondNum;
    }

    //Percentage button
    if (operator === "%") {
        firstNum = percentage(a, b);
    }

    if (prevOperator === "" || operator === "%") {
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
                firstNum = multiply(a, b);
                break;
            case "/":
                secondNum === 0 ? (firstNum = "YOU DIED") : divide(a, b);
                display.classList.add("you-died");
                break;
        }
        prevOperator = operator;
    }
    console.log(`here ${firstNum}`);
    clearDisplay();
    display.textContent = firstNum;

    console.log(firstNum);
};

operators.forEach((operator) =>
    operator.addEventListener("click", () =>
        operate(firstNum, secondNum, operator.textContent)
    )
);
