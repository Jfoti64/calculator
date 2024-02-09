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

    // Reset array and variables
    function clear() {
        inputArr.length = 0;
        currentlyDisplayed = '';
        display.innerHTML = '0';
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        inputArr = [0];
    }

    const display = document.getElementById('display');
    const digits = document.querySelectorAll('.digit');
    const operands = document.querySelectorAll('.operand');
    const equalsButton = document.getElementById('equalsButton');
    const clearButton = document.getElementById('clearButton');

    let num1;
    let num2;
    let operator;
    let result;
    let currentlyDisplayed = '';
    let inputArr = [0];

    digits.forEach(digit => {
        digit.addEventListener('click', () => {
            display.innerHTML = '';
            currentlyDisplayed += digit.innerHTML;
            display.innerHTML = currentlyDisplayed;
            inputArr.push(digit.innerHTML);
        });
    });

    operands.forEach(operand => {
        operand.addEventListener('click', () => {
            currentlyDisplayed = '';
            display.innerHTML = operand.innerHTML;
            inputArr.push(operand.innerHTML);
        });
    });
    
    equalsButton.addEventListener('click', () => {
        let inputStr = inputArr.join('');
        // If no symbol has been entered don't continue
        if (!(inputStr.includes('+') || inputStr.includes('-') || inputStr.includes('X') || inputStr.includes('/'))) {
            return;
        }
        currentlyDisplayed = '';
        inputArr = inputStr.split(/([+\-X/])/);
        // If no second digit entered assume second digit is same as first
        if (inputArr[2] == undefined || inputArr[2] == '') { 
            console.log(inputArr);  
            inputArr.splice(2);    
            inputArr.push((inputArr[0]));
        }
        while (inputArr.length > 2) {
            num1 = inputArr[0];
            num2 = inputArr[2];
            operator = inputArr[1];
            // Check if user is dividing by 0
            if (num2 == 0 && operator == '/') {
                display.innerHTML = 'Not so fast, buddy';
                inputArr.length = 0;
                return;
            }
            result = operate(num1, num2, operator);
            for (let i = 0; i < 3; i++) {
                inputArr.shift();
            }
            // Round result to 7 decimals
            result = parseFloat(result.toFixed(7));
            inputArr.unshift(result);
        }
        display.innerHTML = result;
    });

    clearButton.addEventListener('click', () => {
        clear();
    });
});