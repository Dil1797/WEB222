document.addEventListener("DOMContentLoaded", function () {
    let secretNumber = generateRandomNumber();
    let attempts = 0;
    const maxAttempts = 10;

    const guessInput = document.getElementById('guessInput');
    const submitButton = document.getElementById('submitButton');
    const resultsContainer = document.getElementById('results');

    guessInput.focus();
    guessInput.addEventListener('input', handleInput);
    guessInput.addEventListener('keydown', handleEnterPress); // Handle Enter press
    submitButton.addEventListener('click', handleSubmit);

    function handleInput() {
        // Allow only numeric input
        guessInput.value = guessInput.value.replace(/[^0-9]/g, ''); // Strip non-numeric characters

        // Enable the button if the input has exactly 4 digits
        submitButton.disabled = guessInput.value.length !== 4; 
    }

    function handleEnterPress(event) {
        if (event.key === 'Enter' && !submitButton.disabled) {
            handleSubmit(); // Trigger submission if Enter is pressed and button is enabled
        }
    }

    function handleSubmit() {
        const guess = guessInput.value;
        attempts++;

        // Avoid guessing if input is not a valid four-digit number
        if (guess.length !== 4) {
            alert("Please enter a valid 4-digit number.");
            guessInput.value = ''; // Clear input for valid entry
            guessInput.focus(); // Refocus
            return;
        }

        if (guess === secretNumber) {
            alert(`Congratulations! You've guessed the number ${secretNumber} correctly!`);
            endGame();
            return;
        }

        const { correctPosition, incorrectPosition } = compareNumbers(secretNumber, guess);
        displayResult(guess, correctPosition, incorrectPosition);

        if (attempts >= maxAttempts) {
            alert(`Game over! The correct number was ${secretNumber}.`);
            endGame();
        } else {
            guessInput.value = '';
            guessInput.focus(); // Refocus for next attempt
        }
    }

    function compareNumbers(secret, guess) {
        let correctPosition = 0;
        let incorrectPosition = 0;
        const secretDigits = Array.from(secret);
        const guessDigits = Array.from(guess);

        // Check for correct positions
        for (let i = 0; i < 4; i++) {
            if (secretDigits[i] === guessDigits[i]) {
                correctPosition++;
                secretDigits[i] = null; // To avoid counting again
                guessDigits[i] = null; // To avoid counting again
            }
        }

        // Check for incorrect positions
        for (let i = 0; i < 4; i++) {
            if (guessDigits[i] !== null && secretDigits.includes(guessDigits[i])) {
                incorrectPosition++;
                secretDigits[secretDigits.indexOf(guessDigits[i])] = null; // Mark as counted
            }
        }

        return { correctPosition, incorrectPosition };
    }

    function displayResult(guess, correctPosition, incorrectPosition) {
        // Increment guess count to create a unique ID
        const guessCount = resultsContainer.children.length + 1; // Get the current number of result lines
        const resultDiv = document.createElement('div');
        resultDiv.id = `guessResult${guessCount}`; // Assign a unique ID for the guess result
        resultDiv.classList.add('result-line'); // Add a class for styling if needed

        // Structure the result display
        resultDiv.innerHTML = `
            <span class="guess">${guess}</span>
            <span class="correct">${correctPosition}</span>
            <span class="incorrect">${incorrectPosition}</span>
        `;
        resultsContainer.appendChild(resultDiv); // Append to results section
    }

    function endGame() {
        guessInput.disabled = true;
        submitButton.disabled = true;
    }
});
