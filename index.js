const buttons = document.querySelectorAll(".number, .operator");
let userInput = []; 

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;
        const screen = document.getElementById('resultOutput');
        if (!isNaN(value) || value === ".") {
            screen.textContent += value;
            userInput.push(value);
        } else if (["+", "-", "*", "/", "%"].includes(value)) {
            if (screen.textContent.length > 0 && !isNaN(screen.textContent.slice(-1))) {
                screen.textContent += value;
                userInput.push(value);
            }
        } else if (value === "=") {
            try {
                let expression = userInput.join("");
                let result = math.evaluate(expression);
                screen.textContent = result;
                userInput = [result.toString()];
            } catch (error) {
                screen.textContent = "Erreur";
            }
        } else if (value === "C") {
            screen.textContent = "";
            userInput = [];
        } else if (value === "←") {
            if (screen.textContent.length > 0) {
                screen.textContent = screen.textContent.slice(0, -1);
                userInput.pop();
            }
        }
    });
});
