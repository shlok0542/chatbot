let sendbtn = document.getElementById("SendBtn");
let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");
let flag = false;
let div_number =1;
const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC3p7ZKcIm6kut9MNrIJWaNYPb1zlke5Ls`;

function greeting(){
  const hours = new Date().getHours();
let greeting;
if (hours < 12) {
    greeting = `Good morning!`;
} else if (hours < 18) {
    greeting = "Good afternoon!";
} else {
    greeting = "Good evening!";
}
let welcomemessage =`${greeting} How can I help you today?`
document.querySelectorAll(".text-box")[0].innerHTML = welcomemessage;
}
window.onload=greeting;

sendbtn.addEventListener("click", () => {
  // calling startresponse function
  StartResponse(div_number); //  when send button click
  div_number++;
});

// Api integration and display response

async function StartResponse(tag_number) {
  let userquery = userInput.value;
  userInput.value = "";
  if (userquery == "") return;
  let userMessage = `<div id="user-message"><p>${userquery}</p></div>`;
  chatBox.innerHTML += userMessage;
  let loadingMessage = `<div id="loading"><i class="fa-solid fa-robot"></i><p class=text-box>Thinking....</p></div>`;
  chatBox.innerHTML += loadingMessage;
  chatBox.scrollTop = chatBox.scrollHeight;

  let TEXT = await GenerateResponse(userquery);   // calling GenerateResponse function 
  let cleandText=TEXT.replace(/\*\*\*/g,'').replace(/\`\`\`/g,'').replace(/\#\#\#/g,'').replace(/\*/g,'').replace(/\-\-/g,'').replace(/\*\*/g,'');
  document.getElementById("loading").remove();
  let botMessage = `<div id="chatbot-message"> 
                            <i class="fa-solid fa-robot"></i><p class=text-box>
                        </p></div>`;
  chatBox.innerHTML += botMessage;
  let text_box = document.querySelectorAll(".text-box");
  typeWriter(cleandText, text_box[tag_number]); //calling typeWriter function
  setTimeout(() => {
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
  }, 100);
  if (flag === true) {
    speak(TEXT); 
  }
}
//fetch in data from gemini API
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
    let text_result = data.candidates[0].content.parts[0].text;
    return text_result;
  } catch (error) {
    console.log("Response not Fetch");
  }
}

//End of Api integration and display response

// side bar hide and show functionality

document.getElementById("menuToggle").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  const isOpen = sidebar.style.left === "0px";

  if (isOpen) {
    sidebar.style.left = "-450px"; // Hide the sidebar
  } else {
    sidebar.style.left = "0px"; // Show the sidebar
  }
});
// for speak mode toggle

let sidebar_option = document.getElementById("option");
let speakmode_toggle = document.getElementById("speakmode");
let speakcheckbox = document.getElementById("speakmode-checkbox");
let checkbox = document.getElementById("checkbox");
let ischecked = false;

checkbox.addEventListener("click", () => {
  if (ischecked) {
    flag = false;
    ischecked = false;
    console.log(flag);
  } else {
    ischecked = true;
    flag = true;
    console.log(flag);
  }
});
speakmode_toggle.addEventListener("click", () => {
  sidebar_option.style.display = "none";
  speakcheckbox.style.display = "block";
  setTimeout(() => {
    sidebar_option.style.display = "block";
    speakcheckbox.style.display = "none";
  }, 5000);
});
// End of speakmode toggle
// End of side bar hide and show functionality

function typeWriter(text, element) {
  // typewriter function
  let index = 0;
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type,10); // Adjust speed
    }
  }
  type();
}
function startSpeechRecognition() {
  // voice speech recognition
  if (!("webkitSpeechRecognition" in window)) {
    alert(
      "Sorry, your browser does not support speech recognition. Please try Google Chrome."
    );
  } else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Stop automatically after recognizing a single phrase
    recognition.interimResults = false; // Do not show interim results

    const speech = document.getElementById("speech");

    speech.addEventListener("click", () => {
      recognition.start();
      console.log("Voice recognition started. Speak now.");
    });

    recognition.onstart = () => {
      console.log(
        "Voice recognition activated. Please speak into the microphone."
      );
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Result received: " + transcript);
      userInput.value = transcript; // Set the recognized text to the input field
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: " + event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition service has stopped.");
    };
  }
}
function speak(message) {
  // definition of speak function
  let text_content = new SpeechSynthesisUtterance(message);
  text_content.pitch = 1;
  text_content.volume = 1;
  text_content.rate = 1;
  text_content.lang = "en-GB";
  window.speechSynthesis.speak(text_content);
}
