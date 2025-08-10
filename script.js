const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
document.getElementById("start-btn").addEventListener("click", () => {
    recognition.start();
});
recognition.onresult = async (event) => {
    let userText = event.results[0][0].transcript;
    document.getElementById("user-text").textContent = userText;

    speak("You said: " + userText);
    let aiResponse = await getAIResponse(userText);

    document.getElementById("ai-text").textContent = aiResponse;
    speak(aiResponse);
};
async function getAIResponse(prompt) {
    try {
        let response = await fetch("https://YOUR-BACKEND-URL/api/ask", {  // change this to your Render/Vercel backend link
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        let data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Error:", error);
        return "Sorry, I couldn’t reach the AI service.";
    }
}
function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    speechSynthesis.speak(utter);
}
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};
