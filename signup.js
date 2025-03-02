
let signup_btn = document.getElementById("sign-up");
let signin_btn=document.getElementById("sign-in");

// on click of the signup button, the user is redirected to the main page
signup_btn.addEventListener("click",() => {
let fullname = document.getElementById("fullname").value;
let username = document.getElementById("username").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
let errorMessage = document.getElementById("error-message");
    console.log("clicked");
  if(email === "" || password === "" || fullname === "" || username === ""){
    errorMessage.textContent = "Please fill in all fields.";
  }else {
    errorMessage.textContent = "";
    alert("Login Successful");
    window.location.href = "/Project-1/chatbot/index.html";
  }
});
// on click of the signin button, the user is redirected to the signi page
signin_btn.addEventListener("click",() => {
    toggleSignup();
});
function toggleSignup() {
  window.location.href = "/Project-1/chatbot/LoginPage.html";
}
