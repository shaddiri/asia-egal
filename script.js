// Function to append value to the display
function appendToDisplay(value) {
    const result = document.getElementById('result');
    result.value += value;
    createSparkle(event);
}

// Function to clear the display
function clearDisplay() {
    document.getElementById('result').value = '';
    createSparkle(event);
}

// Function to delete the last character
function deleteLastChar() {
    const result = document.getElementById('result');
    result.value = result.value.slice(0, -1);
    createSparkle(event);
}

// Function to calculate the result
function calculate() {
    const result = document.getElementById('result');
    try {
        // Replace × with * for calculation
        let expression = result.value.replace(/×/g, '*');
        // Handle percentage calculations
        expression = expression.replace(/(\d+)%/g, '($1/100)');
        result.value = eval(expression);
    } catch (error) {
        result.value = 'Error';
    }
    createSparkle(event);
}

// Function to create sparkle effect
function createSparkle(event) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Random color for sparkle
    const colors = ['#ff99cc', '#cc99ff', '#99ccff', '#ff9966', '#66cc99'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    sparkle.style.backgroundColor = randomColor;
    sparkle.style.width = `${Math.random() * 20 + 10}px`;
    sparkle.style.height = sparkle.style.width;
    sparkle.style.left = `${event.clientX - parseFloat(sparkle.style.width) / 2}px`;
    sparkle.style.top = `${event.clientY - parseFloat(sparkle.style.height) / 2}px`;
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const result = document.getElementById('result');
    
    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === '%') {
        appendToDisplay('%');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLastChar();
    } else if (key === 'Escape' || key === 'Delete') {
        clearDisplay();
    }
});