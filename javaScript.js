document.addEventListener('DOMContentLoaded', function() {

    function add(num1, num2) {
        return parseInt(num1) + parseInt(num2);
    }

    function subtract(num1, num2) {
        return num1 - num2;
    }

    function multiply(num1, num2) {
        return num1 * num2;
    }

    function divide(num1, num2) {
        return num1 / num2;
    }

    function operate(num1, num2, operator) {
        switch (operator) {
            case '+':
                return add(num1, num2);
            case '-':
                return subtract(num1, num2);
            case 'X':
                return multiply(num1, num2);
            case '/':
                return divide(num1, num2);
        }
    }

    let num1;
    let num2;
    let operator;
    let result;
    inputArr = [];

    const display = document.getElementById('display');
    const digits = document.querySelectorAll('.digit');
    const operands = document.querySelectorAll('.operand');
    const equalsButton = document.getElementById('equalsButton');
    const clearButton = document.getElementById('clearButton');

    digits.forEach(digit => {
        digit.addEventListener('click', () => {
            display.innerHTML = digit.innerHTML;
            inputArr.push(digit.innerHTML);
        });
    });

    operands.forEach(operand => {
        operand.addEventListener('click', () => {
            display.innerHTML = operand.innerHTML;
            inputArr.push(operand.innerHTML);
        });
    });
    
    equalsButton.addEventListener('click', () => {
    inputStr = inputArr.join('');
    inputArr = inputStr.split(/([+\-X/])/);
    while (inputArr.length > 1) {
        num1 = inputArr[0];
        num2 = inputArr[2];
        operator = inputArr[1];
        result = operate(num1, num2, operator);
        for (let i = 0; i < 3; i++) {
            inputArr.shift();
        }
        inputArr.unshift(result);
    }
    display.innerHTML = result;
    });

    clearButton.addEventListener('click', () => {
        // Clear all data from array
        inputArr.length = 0;
        display.innerHTML = '0';
    });
    

});