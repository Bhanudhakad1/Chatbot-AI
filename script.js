const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const toggleDarkMode = document.getElementById("toggleDarkMode");

// ✅ Latest API key
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
                model: "openrouter/auto", // Best option for testing
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        console.log("API response:", data);  // Debug log

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
