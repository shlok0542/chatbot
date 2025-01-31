document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // Basic validation
    if (username === '' || email === '' || password === '') {
        messageDiv.textContent = 'All fields are required!';
        return;
    }

    // Simulate a successful sign-up
    messageDiv.textContent = 'Sign up successful! Welcome, ' + username + '!';
    messageDiv.style.color = 'green';

    // Clear the form
    document.getElementById('signupForm').reset();
});