function validateLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    
    if (email === "" || password === "") {
        errorMessage.textContent = "Please fill in all fields.";
    } else {
        errorMessage.textContent = "";
        alert("Login Successful");
        window.location.href = "index.html";
    }
}

function toggleSignup() {
    window.location.href = "signup.html";
}