const buttons = document.querySelectorAll(".number, .operator");
let userInput = []; 
let history = [];

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
                history.push({calculation: expression, result: result});
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


function displayHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = '';
    for(let i = history.length - 1; i >= 0; i--) {
        historyElement.innerHTML += `<p>${history[i].calculation} = ${history[i].result}</p>`;
    }
}

document.getElementById('historyButton').addEventListener('click', displayHistory);
