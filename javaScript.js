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

    function operateOnAllElements() {
        while (inputArr.length > 1) {
            let firstNumberIndex = -1; // Initialize the index of the first number
            console.log(inputArr);
            // Loop through the array starting from index 2
            for (let i = 2; i < inputArr.length; i++) {
                // Check if the current element is a number
                if (!isNaN(parseFloat(inputArr[i]))) {
                    // If it's a number, store its index and break out of the loop
                    firstNumberIndex = i;
                    break;
                }
            }

            // If last digit entered was an operator, assume the next number is the same as the preceding number
            if (firstNumberIndex === -1) {
                inputArr.splice(2, inputArr.length - 2, inputArr[0]);
                return operate(inputArr[0], inputArr[0], lastSymbolInput);
            }



            num1 = inputArr[0];
            operator = inputArr[firstNumberIndex - 1];
            inputArr.splice(1, firstNumberIndex - 2);
            console.log(inputArr);
            num2 = inputArr[2];
            
    
            // Check if user is dividing by 0
            if (num2 == 0 && operator == '/') {
                display.innerHTML = 'Not so fast, buddy';
                inputArr.length = 0;
                return;
            }
    
            result = operate(num1, num2, operator);
            inputArr.splice(0, 3, result);  // Replace the first 3 elements with the result
            // Round result to 7 decimals
            result = parseFloat(result.toFixed(7));
        }
        console.log(inputArr);
        return result;
    }


    function getResult() {
        let inputStr = inputArr.join('');
        // If no symbol and/or no number has been entered don't continue
        if (!(inputStr.includes('+') || inputStr.includes('-') || inputStr.includes('X') || inputStr.includes('/'))) {
            return;
        }
        currentlyDisplayed = '';
        
        // Split array on "+, -, X, /" thereby joining all numbers on either side of an operator together
        inputArr = inputStr.split(/([+\-X/])/);

        // Filter out whitespace in the arr
        inputArr = inputArr.filter(element => element.trim() !== '');

        result = operateOnAllElements();
        display.innerHTML = result;
    };


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
    let lastSymbolInput;
    

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
            lastSymbolInput = operand.innerHTML;
            inputArr.push(operand.innerHTML);
        });
    });
    
    equalsButton.addEventListener('click', () => {
        getResult();
    });

    clearButton.addEventListener('click', () => {
        clear();
    });
});