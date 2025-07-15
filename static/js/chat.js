class ChatManager {
    constructor() {
        this.messages = [];
        this.chatMessages = document.getElementById('chat-messages');
        this.messageInput = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-button');
        
        this.init();
    }

    init() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 200) + 'px';
        });
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Hide welcome screen
        this.hideWelcomeScreen();

        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        this.sendButton.disabled = true;

        // Show loading
        this.showLoading();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            this.hideLoading();
            this.addMessage(data.message, 'assistant');
            this.sendButton.disabled = false;
        } catch (error) {
            this.hideLoading();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
            this.sendButton.disabled = false;
        }
    }

    hideWelcomeScreen() {
        const welcome = this.chatMessages.querySelector('.text-center');
        if (welcome) {
            welcome.remove();
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender} message-enter`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="flex justify-end">
                    <div class="bg-blue-600 text-white rounded-2xl px-4 py-2 max-w-md">
                        <p class="text-sm">${this.formatMessage(text)}</p>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="flex">
                    <div class="bg-gray-100 rounded-2xl px-4 py-2 max-w-md">
                        <p class="text-sm">${this.formatMessage(text)}</p>
                    </div>
                </div>
            `;
        }

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(text) {
        return text.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
    }

    showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message assistant message-enter';
        loadingDiv.id = 'loading-message';
        loadingDiv.innerHTML = `
            <div class="flex">
                <div class="bg-gray-100 rounded-2xl px-4 py-2">
                    <div class="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(loadingDiv);
        this.scrollToBottom();
    }

    hideLoading() {
        const loading = document.getElementById('loading-message');
        if (loading) {
            loading.remove();
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatManager();
});
