let sendbtn = document.getElementById("SendBtn");
let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");
let flag = false;
let div_number = 1;
const API_KEY = "AIzaSyCRXiZg2zxASXRh1UgLyfNKCECPUl_UNa0";
const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${API_KEY}`;

sendbtn.addEventListener("click", () => {
  if (userInput.value.trim() != "") {
    document.querySelector(".chatbot-label").style.display = "none";
    // calling startresponse function
    StartResponse(div_number); //  when send button click
    div_number++;
  } else {
    alert("Please enter your message");
  }
});

// Api integration and display response

async function StartResponse(tag_number) {
  let userquery = userInput.value;
  userInput.value = "";
  if (userquery == "") return;
  let userMessage = `<div id="user-message"><p>${userquery}</p></div>`;
  chatBox.innerHTML += userMessage;
  let loadingMessage = `<div id="loading">
  <!-- From Uiverse.io by andrew-demchenk0 --> 
<div class="cube-loader">
  <div class="cube-top"></div>
  <div class="cube-wrapper">
    <span style="--i:0" class="cube-span"></span>
    <span style="--i:1" class="cube-span"></span>
    <span style="--i:2" class="cube-span"></span>
    <span style="--i:3" class="cube-span"></span>
  </div>
  </div><pre class=text-box>Thinking....</pre></div>`;
  chatBox.innerHTML += loadingMessage;
  scrollToBottom();
  // calling GenerateResponse function
  let TEXT = await GenerateResponse(userquery);
  let cleandText = TEXT.replace(/\*\*/g,"")
    .replace(/\*/g, "")
    .replace(/\`\`\`/g, "")
    .replace(/\`/g, "")
    .replace(/\</g, "&lt;")
    .replace(/\>/g, "&gt;");
  document.getElementById("loading").remove();
  let botMessage = `<div id="chatbot-message"><pre class=text-box></pre></div>`;
  chatBox.innerHTML += botMessage;
  let text_box = document.querySelectorAll(".text-box");
  typeWriter(cleandText, text_box[tag_number]);
}
//fetch in data from gemini API
async function GenerateResponse(message) {
  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${message}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 1,
      topK: 64,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  };
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };
  try {
    let response = await fetch(api_url, request);
    let data = await response.json();
    let text_result = data.candidates[0].content.parts[0].text;
    return text_result;
  } catch (error) {
    error(error);
  }
}

//End of Api integration and display response

// side bar hide and show functionality
let menutoggle = document.getElementById("menuToggle");
let crosstoggle = document.getElementById("crossToggle");
const sidebar = document.getElementById("sidebar");
menutoggle.addEventListener("click", () => {
  sidebar.style.left = "0px"; // Show the sidebar
  menutoggle.style.display = "none";
  crosstoggle.style.display = "block";
});
crosstoggle.addEventListener("click", () => {
  sidebar.style.left = "-450px"; // Hide the sidebar
  crosstoggle.style.display = "none";
  menutoggle.style.display = "block";
});
//end
// typewriter function for chatbot
function typeWriter(text, element) {
  // typewriter function
  let index = 0;
  function textwriter() {
    if (index < text.length) {
      element.innerHTML = text.substring(0, index + 1);
      index++;
      scrollToBottom();
      setTimeout(textwriter, 1); // Adjust speed
    }
  }
  textwriter();
}
//end
function startSpeechRecognition() {
  // voice speech recognition
  if (!("webkitSpeechRecognition" in window)) {
    alert(
      "Sorry, your browser does not support speech recognition. Please try Google Chrome."
    );
  } else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    const speech = document.getElementById("speech");
    speech.addEventListener("click", () => {
      recognition.start();
    });
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      userInput.value = transcript;
    };
  }
}

// Function to scroll to the bottom
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}
