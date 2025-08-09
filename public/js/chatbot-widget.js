document.addEventListener('DOMContentLoaded', () => {
    const chatbotParent = document.getElementById('chatbot-parent');

    if (chatbotParent) {
        const style = document.createElement('style');
        style.textContent = `
            .chatbot-container {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50vh;
                background-color: rgba(255, 255, 255, 0.3);
                backdrop-filter: blur(8px);
                border-top: 1px solid rgba(255, 255, 255, 0.6);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 1000;
            }
            .chat-header {
                padding: 0.75rem;
                text-align: center;
                background-color: rgba(255, 255, 255, 0.2);
                border-bottom: 1px solid rgba(255, 255, 255, 0.5);
            }
            .chat-messages {
                flex-grow: 1;
                padding: 1rem;
                overflow-y: auto;
            }
            .message {
                margin-bottom: 0.75rem;
                display: flex;
            }
            .message.user { justify-content: flex-end; }
            .message.bot { justify-content: flex-start; }
            .message-bubble {
                max-width: 85%;
                padding: 0.6rem 0.9rem;
                border-radius: 1rem;
                line-height: 1.4;
            }
            .message.user .message-bubble {
                background-color: rgba(59, 130, 246, 0.7);
                color: white;
                border-bottom-right-radius: 0.25rem;
            }
            .message.bot .message-bubble {
                background-color: rgba(255, 255, 255, 0.4);
                color: #1f2937;
                border-bottom-left-radius: 0.25rem;
            }
            .chat-input-area {
                padding: 1rem;
                display: flex;
                gap: 0.5rem;
                border-top: 1px solid rgba(255, 255, 255, 0.5);
            }
            .chat-input {
                flex-grow: 1;
                padding: 0.5rem 1rem;
                border: 1px solid rgba(209, 213, 219, 1);
                border-radius: 9999px;
                outline: none;
            }
            .send-button {
                padding: 0.5rem 1rem;
                border-radius: 9999px;
                background-color: #3B82F6;
                color: white;
                border: none;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);

        chatbotParent.innerHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <div class="chat-header">
                    <img src="revisx.svg" alt="RevisX Logo" style="height: 40px; width: auto; margin-bottom: 4px; display: inline-block;">
                    <span style="font-size: 0.8rem; font-weight: 400; color: #374151;">AI Chatbot</span>
                </div>
                <div id="chat-messages" class="chat-messages">
                    <div class="message bot">
                        <div class="message-bubble">Hello! I am now correctly placed in the sidebar.</div>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="user-input" class="chat-input" placeholder="Ask a question...">
                    <button id="send-button" class="send-button">Send</button>
                </div>
            </div>
        `;

        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');

        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            messageDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        sendButton.addEventListener('click', () => {
            const userText = userInput.value.trim();
            if (userText) {
                addMessage(userText, 'user');
                userInput.value = '';
                setTimeout(() => {
                    addMessage("This is a placeholder response.", 'bot');
                }, 500);
            }
        });

        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });
    } else {
        console.error('The chatbot container was not found on the page.');
    }
});