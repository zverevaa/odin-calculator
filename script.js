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
    if (digit.dataset.digit === "." && display.textContent.includes(".")) {
        return;
    } else if (
        digit.dataset.digit === "." &&
        firstNum === null &&
        display.textContent === "0"
    ) {
        displayNum = `0.`;
        display.textContent = displayNum;
    } else {
        if (firstNum !== null && digit.dataset.digit === ".") {
            displayNum = firstNum;
        }
        displayNum = makeDisplay(displayNum, digit.dataset.digit);
        display.textContent = displayNum;
        if (firstNum !== null && display.textContent.includes(".")) {
            firstNum = Number(display.textContent);
        }
    }
};

const makeDisplay = (displayNum, digit) => {
    return (displayNum += digit);
};

//Clear display

const clearDisplay = () => {
    displayNum = "";
    display.textContent = "0";
};

const allClear = () => {
    clearDisplay();
    firstNum = null;
    secondNum = null;
    display.classList.remove("you-died");
    prevOperator = "";
    operator = "";
};
const clear = document.querySelector(".clear");
clear.addEventListener("click", allClear);

//Remove last digit

const removeLastDigit = () => {
    if (display.textContent === "0") return; // Checks if there's anything to delete
    if (firstNum && display.textContent === firstNum.toString()) return; // If there was a calculation, it doesn't let to edit the num

    displayNum = display.textContent;
    displayNum = displayNum.slice(0, -1);
    display.textContent = displayNum;
    if (display.textContent === "") display.textContent = "0";
};

remove.addEventListener("click", removeLastDigit);

//Toggle negative
const toggleNegative = () => {
    displayNum = display.textContent;

    if (displayNum.includes("-")) {
        displayNum = displayNum.substring(1);
        firstNum = Number(displayNum);
    } else {
        displayNum = `-${displayNum}`;
        firstNum = Number(displayNum);
    }

    display.textContent = displayNum;
};

negative.addEventListener("click", toggleNegative);

//Keyboard input
window.addEventListener("keydown", (e) => {
    e.preventDefault();
    const button = document.querySelector(`.digit[data-digit="${e.key}"]`);
    if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
        getDigit(button);
    }
    switch (e.key) {
        case "Backspace":
            removeLastDigit();
            break;
        case "+":
        case "-":
        case "/":
        case "*":
            operate(firstNum, secondNum, e.key);
            break;
        case "Delete":
            allClear();
            break;
        case "Enter":
            operate(firstNum, secondNum, operator);
            break;
    }
});
//
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
        firstNum = Number(displayNum);
        a = firstNum;
        clearDisplay();
    } else {
        secondNum = Number(displayNum);
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
                firstNum = Number(add(a, b).toFixed(4));
                break;
            case "-":
                firstNum = Number(substract(a, b).toFixed(4));
                break;
            case "*":
                firstNum = Number(multiply(a, b).toFixed(4));
                break;
            case "/":
                if (secondNum === 0) {
                    firstNum = "YOU DIED";
                    display.classList.add("you-died");
                } else {
                    firstNum = Number(divide(a, b).toFixed(4));
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
