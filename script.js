const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const toggleDarkMode = document.getElementById("toggleDarkMode");

// ✅ Updated API key
const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Get AI response
async function getBotResponse(userMessage) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost",
                "X-Title": "AI Chatbot Test"
            },
            body: JSON.stringify({
                model: "openrouter/auto",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        console.log("API response:", data);

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            return "Error: No response from AI.";
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return "Error: Failed to connect.";
    }
}

// Send message
sendButton.addEventListener("click", async () => {
    let userMessage = userInput.value.trim();
    if (!userMessage) return;

    chatbox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    chatbox.innerHTML += `<p><strong>Bot:</strong> <em>Typing...</em></p>`;

    let botResponse = await getBotResponse(userMessage);
    chatbox.lastChild.innerHTML = `<strong>Bot:</strong> ${botResponse}`;

    userInput.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
});

// Enter key shortcut
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

// Dark mode toggle
toggleDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleDarkMode.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
