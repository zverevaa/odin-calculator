let firstNum = null;
let secondNum = null;
let prevOperator = "";
let operator = "";
let displayNum = "";

const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
display.textContent = "0";
const operators = document.querySelectorAll(".operator");
const remove = document.querySelector(".rm-last");
const negative = document.querySelector(".tgl-negative");

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

//Remove last digit
const removeLastDigit = () => {
    if (firstNum === null) return;
    displayNum = firstNum.toString();
    displayNum = displayNum.slice(0, -1);
    firstNum = parseInt(displayNum);
    display.textContent = displayNum;
};

remove.addEventListener("click", removeLastDigit);

//Toggle negative
const toggleNegative = () => {
    displayNum = display.textContent;

    if (displayNum.includes("-")) {
        displayNum = displayNum.substring(1);
        firstNum = parseInt(displayNum);
    } else {
        displayNum = `-${displayNum}`;
        firstNum = parseInt(displayNum);
    }
    display.textContent = displayNum;
};

negative.addEventListener("click", toggleNegative);

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
                if (secondNum === 0) {
                    firstNum = "YOU DIED";
                    display.classList.add("you-died");
                } else {
                    firstNum = divide(a, b);
                }
                break;
        }
        prevOperator = operator;
    }
    clearDisplay();
    display.textContent = firstNum;
};

operators.forEach((operator) =>
    operator.addEventListener("click", () =>
        operate(firstNum, secondNum, operator.textContent)
    )
);
