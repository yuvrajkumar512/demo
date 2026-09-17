```javascript
// --- Calculator Logic ---
const inputDisplay = document.getElementById("inputDisplay");
const outputDisplay = document.getElementById("outputDisplay");

let currentInput = "";

// --- Event Listeners ---
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        handleInput(value);
    });
});

// --- Input Handling ---
function handleInput(value) {
    switch (value) {
        case "C":
            currentInput = "";
            updateDisplay();
            break;
        case "⌫":
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
            break;
        case "=":
            try {
                const result = evaluateExpression(currentInput);
                currentInput = result.toString();
                updateDisplay();
            } catch (e) {
                currentInput = "Error";
                updateDisplay();
            }
            break;
        default:
            currentInput += value;
            updateDisplay();
    }
}

// --- Display Update ---
function updateDisplay() {
    inputDisplay.textContent = currentInput;
    outputDisplay.textContent = currentInput;
}

// --- Expression Evaluation ---
function evaluateExpression(expr) {
    // Replace factorial notation
    expr = expr.replace(/([0-9]+)!/g, "factorial($1)");
    return eval(
        `function factorial(n) { if (n === 0 || n === 1) return 1; let res = 1; for (let i=2; i<=n; i++) res *= i; return res; } ${expr}`
    );
}