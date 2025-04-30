const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const toggleDarkMode = document.getElementById("toggleDarkMode");

// OpenRouter API Key
const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Function to get AI response
async function getBotResponse(userMessage) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            return "Error: No response from AI.";
        }

    } catch (error) {
        return "Error: Failed to connect.";
    }
}

// Send message on button click
sendButton.addEventListener("click", async () => {
    let userMessage = userInput.value.trim();
    if (!userMessage) return;

    chatbox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

    let botResponse = await getBotResponse(userMessage);
    chatbox.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;

    userInput.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
});

// Send message on Enter key press
userInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

// Dark Mode Toggle
toggleDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleDarkMode.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
