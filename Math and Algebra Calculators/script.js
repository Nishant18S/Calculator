// Show the sidebar and hide the intro screen
window.onload = function() {
    setTimeout(function() {
        document.getElementById('intro').style.display = 'none'; // Hide the intro image
        document.getElementById('sidebar').style.display = 'block'; // Show sidebar
    }, 2000); // Wait for 2 seconds before transitioning
};

// Function to hide the intro image
function hideImage() {
    const image = document.getElementById("introImage");
    image.style.display = "none";
}

// Function to show specific calculators
function showCalculator(calculatorId) {
    // Hide all calculators
    const calculators = document.querySelectorAll('.calculator');
    calculators.forEach(calc => calc.style.display = 'none');

    // Show the selected calculator
    const selectedCalculator = document.getElementById(calculatorId);
    selectedCalculator.style.display = 'block';
    
    hideImage();  // Hide the intro image when a calculator is shown
}

// Consolidated function to clear inputs and results
function clearInputs(calculatorId) {
    const calculator = document.getElementById(calculatorId);
    const inputs = calculator.querySelectorAll('input');
    const results = calculator.querySelectorAll('p, div');

    // Clear inputs and results
    inputs.forEach(input => input.value = '');
    results.forEach(result => result.textContent = '');

    if (calculatorId === 'inequalityCalculator') {
        const inequalityInput = calculator.querySelector('#inequalityInput');
        const inequalityResult = calculator.querySelector('#inequalityResult');
        inequalityInput.value = '';
        inequalityResult.textContent = '';
    }
}

// Example of Calculate functions (you can expand these functions for each specific calculator)
function calculateComplex() {
    const real1 = parseFloat(document.getElementById('real1').value);
    const imaginary1 = parseFloat(document.getElementById('imaginary1').value);
    const real2 = parseFloat(document.getElementById('real2').value);
    const imaginary2 = parseFloat(document.getElementById('imaginary2').value);

    // Adding the real and imaginary parts
    const realResult = real1 + real2;
    const imaginaryResult = imaginary1 + imaginary2;

    // Format the result in the form of a + bi or a - bi
    let complexResult;
    if (imaginaryResult < 0) {
        complexResult = `${realResult} - ${Math.abs(imaginaryResult)}i`;
    } else {
        complexResult = `${realResult} + ${imaginaryResult}i`;
    }

    // Display the results
    document.getElementById('complexResult').textContent = `Complex Number: ${complexResult}`;
    document.getElementById('realPart').textContent = `Real: ${realResult}`;
    document.getElementById('imaginaryPart').textContent = `Imaginary: ${imaginaryResult}`;
}

function calculatePercentage() {
    const originalValue = parseFloat(document.getElementById('originalValue').value);
    const percentage = parseFloat(document.getElementById('percentage').value);

    const result = (originalValue * percentage) / 100;
    document.getElementById('percentageResult').textContent = `Percentage: ${result}`;
}

function calculateCube() {
    const number = parseInt(document.getElementById('cubeIn').value, 10);

    // Check if the input is a valid number
    if (isNaN(number)) {
        document.getElementById('cubeResult').textContent = 'Please enter a valid integer';
    } else {
        const result = number ** 3;
        document.getElementById('cubeResult').textContent = `Cube: ${result}`;
    }
}

// Recursive function for calculating prime factors
function recursivePrime(n, d) {
    if (n <= 1) return [];
    if (n == 2) return [2];  // 2 is the only even prime number
    let factors = [];
    let flag = false;
    while (n % d == 0) {
        factors.push(d);
        n /= d;
        flag = true;
    }
    if (flag) {
        return factors.concat(recursivePrime(n, d + 1));
    }
    return recursivePrime(n, d + 1);
}

// Prime Factorization Calculator
function calculateFactors() {
    // Get the user input and convert it to an integer
    const number = parseInt(document.getElementById("factorInput").value);

    // Check if the input is a valid number and greater than 1
    if (isNaN(number) || number < 2) {
        document.getElementById("factorResult").textContent = "Please enter a valid number greater than 1.";
        return;
    }

    // Call the recursive function to calculate prime factors
    const factors = recursivePrime(number, 2);

    // Display the result in the <p> element
    if (factors.length > 0) {
        document.getElementById("factorResult").textContent = `Prime factors: ${factors.join(", ")}`;
    } else {
        document.getElementById("factorResult").textContent = "No prime factors found.";
    }
}

// Exponential formula calculation
function calculateExponential() {
    const base = parseFloat(document.getElementById('base').value);
    const exponent = parseFloat(document.getElementById('exponent').value);

    if (isNaN(base) || isNaN(exponent)) {
        document.getElementById('exponentialResult').textContent = "Please enter valid numbers.";
        return;
    }

    const result = Math.pow(base, exponent);
    document.getElementById('exponentialResult').textContent = `Result: ${result}`;
}

// Cube root calculation
function calculateCubeRoot() {
    const number = parseFloat(document.getElementById('cubeInput').value);

    if (isNaN(number)) {
        document.getElementById('cubeRootResult').textContent = "Please enter a valid number.";
        return;
    }

    const result = Math.cbrt(number);
    document.getElementById('cubeRootResult').textContent = `Cube Root: ${result}`;
}

// Simplify the Boolean expression
function simplifyBoolean() {
    const expression = document.getElementById('booleanExpression').value.trim();
    let simplifiedExpression = expression;

    // Simplify the expression using basic Boolean rules
    simplifiedExpression = applyBooleanLaws(simplifiedExpression);

    // Display the simplified expression
    document.getElementById('simplifiedResult').textContent = `Simplified Expression: ${simplifiedExpression}`;
}

// Function to apply Boolean simplifications
function applyBooleanLaws(expression) {
    // Apply the identity law (A + 0 = A, A * 1 = A)
    expression = expression.replace(/\b(\w+)\s*\+\s*0\b/g, '$1');
    expression = expression.replace(/\b(\w+)\s*\*\s*1\b/g, '$1');

    // Apply the null law (A * 0 = 0, A + 1 = 1)
    expression = expression.replace(/\b(\w+)\s*\*\s*0\b/g, '0');
    expression = expression.replace(/\b(\w+)\s*\+\s*1\b/g, '1');

    // Apply the complement law (A * A' = 0, A + A' = 1)
    expression = expression.replace(/\b(\w+)\s*\*\s*\1'\b/g, '0');
    expression = expression.replace(/\b(\w+)\s*\+\s*\1'\b/g, '1');

    // Apply the idempotent law (A * A = A, A + A = A)
    expression = expression.replace(/\b(\w+)\s*\*\s*\1\b/g, '$1');
    expression = expression.replace(/\b(\w+)\s*\+\s*\1\b/g, '$1');

    // Return the simplified expression
    return expression;
}

// Flow Rate Calculator
function showFlowRateCalculator() {
    const pipeDiameter = parseFloat(document.getElementById('pipeDiameter').value);
    const velocity = parseFloat(document.getElementById('velocity').value);
  
    if (isNaN(pipeDiameter) || isNaN(velocity)) {
      alert("Please enter valid numbers");
      return;
    }
  
    const flowRate = Math.PI * Math.pow(pipeDiameter / 2, 2) * velocity; // Flow rate formula
    document.getElementById('flowRateResult').textContent = `Flow Rate: ${flowRate} m³/s`;
}

// Impulse Calculator
function showImpulseCalculator() {
    const force = parseFloat(document.getElementById('force').value);
    const time = parseFloat(document.getElementById('time').value);
  
    if (isNaN(force) || isNaN(time)) {
      alert("Please enter valid numbers");
      return;
    }
  
    const impulse = force * time;
    document.getElementById('impulseResult').textContent = `Impulse: ${impulse} N·s`;
}

// Function to solve inequality
function showInequalityCalculator() {
    const inequality = document.getElementById('inequalityInput').value.trim();

    if (!inequality) {
        alert("Please enter a valid inequality");
        return;
    }

    // Regex to match inequalities of the form ax + b > c, ax + b < c, etc.
    const regex = /^([+-]?\d*)x\s*([<>]=?)\s*(\d+)$/;
    const match = inequality.match(regex);

    if (match) {
        let coefficient = match[1] === '' || match[1] === '+' ? 1 : (match[1] === '-' ? -1 : parseInt(match[1]));
        const operator = match[2];
        const constant = parseInt(match[3]);

        let solution = '';

        // Solve based on the operator
        switch (operator) {
            case '>':
                solution = `x > ${(constant / coefficient).toFixed(2)}`;
                break;
            case '>=':
                solution = `x >= ${(constant / coefficient).toFixed(2)}`;
                break;
            case '<':
                solution = `x < ${(constant / coefficient).toFixed(2)}`;
                break;
            case '<=':
                solution = `x <= ${(constant / coefficient).toFixed(2)}`;
                break;
            default:
                solution = "Invalid inequality operator!";
                break;
        }

        // Display the solution
        document.getElementById('inequalityResult').textContent = `Solution: ${solution}`;
    } else {
        alert("Invalid inequality format! Please use a format like x+2>5.");
    }
}

// Function to toggle sidebar visibility on small screens
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Event listener for the Enter key to calculate results and Delete key to clear inputs
document.addEventListener('keydown', function(event) {
    // Find the currently visible calculator
    const visibleCalculator = document.querySelector('.calculator:not([style*="display: none"])');

    if (visibleCalculator) {
        const calculatorId = visibleCalculator.id;

        if (event.key === 'Enter') {
            // Trigger the appropriate calculate function based on the visible calculator
            switch (calculatorId) {
                case 'complexCalculator':
                    calculateComplex();
                    break;
                case 'percentageCalculator':
                    calculatePercentage();
                    break;
                case 'cubeCalculator':
                    calculateCube();
                    break;
                case 'factorCalculator':
                    calculateFactors();
                    break;
                case 'exponentialCalculator':
                    calculateExponential();
                    break;
                case 'cubeRootCalculator':
                    calculateCubeRoot();
                    break;
                case 'booleanCalculator':
                    simplifyBoolean();
                    break;
                case 'partialFractionCalculator':
                    showPartialFractionCalculator();
                    break;
                case 'impulseCalculator':
                    showImpulseCalculator();
                    break;
                case 'flowRateCalculator':
                    showFlowRateCalculator();
                    break;
                case 'inequalityCalculator':
                    showInequalityCalculator();
                    break;
                default:
                    console.log("No calculator selected.");
            }
        } 
        else if (event.key === 'Delete') {
            // Clear the inputs and results based on the visible calculator
            clearInputs(calculatorId);
        }
    }
});
// Handling the Clear button click for each calculator
function clearButtonHandler(calculatorId) {
    clearInputs(calculatorId);
}
