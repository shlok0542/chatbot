let sendbtn = document.getElementById("SendBtn");
let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");

// Api integration and display response 

const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC3p7ZKcIm6kut9MNrIJWaNYPb1zlke5Ls`;

function StartResponse() {
  let userquery = userInput.value;
  userInput.value = "";
  if (userquery == "") return;
  let userMessage = `<div id="user-message"><p>${userquery}</p><i class="fa-sharp-duotone fa-solid fa-circle-user"></i></div>`;
  chatBox.innerHTML += userMessage;
  let loadingMessage = `<div id="loading"><i class="fa-solid fa-robot"></i><p>Typing....</p></div>`;
  chatBox.innerHTML += loadingMessage;
  chatBox.scrollTop = chatBox.scrollHeight;
  GenerateResponse(userquery);
}
async function GenerateResponse(message) {
  let RequestOption = {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    }),
  };
  try {
    let response = await fetch(api_url, RequestOption);
    let data = await response.json();
    document.getElementById("loading").remove();
    let botMessage = `<div id="chatbot-message">
                            <i class="fa-solid fa-robot"></i><p>
                               ${data.candidates[0].content.parts[0].text}
                        </p></div>`;
    chatBox.innerHTML += botMessage;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.log("Response not Fetch");
  }
}


// voice speech recognition 

function startSpeechRecognition() {
if (!('webkitSpeechRecognition' in window)) {
    alert("Sorry, your browser does not support speech recognition. Please try Google Chrome.");
} else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Stop automatically after recognizing a single phrase
    recognition.interimResults = false; // Do not show interim results

    const speech = document.getElementById("speech");

    speech.addEventListener('click', () => {
        recognition.start();
        console.log('Voice recognition started. Speak now.');
    });

    recognition.onstart = () => {
        console.log('Voice recognition activated. Please speak into the microphone.');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Result received: ' + transcript);
        userInput.value = transcript; // Set the recognized text to the input field
    };

    recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = () => {
        console.log('Voice recognition service has stopped.');
    };
}
}


// for side bar toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const isOpen = sidebar.style.left === '0px';

    if (isOpen) {
        sidebar.style.left = '-450px'; // Hide the sidebar
    } else {
        sidebar.style.left = '0px'; // Show the sidebar
    }
});