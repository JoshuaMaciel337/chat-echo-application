// Additional UI functionality
document.addEventListener('DOMContentLoaded', () => {
    // Handle attachment button
    const attachButton = document.querySelector('button[title="Attach"]');
    if (attachButton) {
        attachButton.addEventListener('click', () => {
            alert('Attachment feature coming soon!');
        });
    }

    // Handle search button
    const searchButton = document.querySelector('button[title="Search"]');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            alert('Search feature coming soon!');
        });
    }

    // Handle voice button
    const voiceButton = document.querySelector('button[title="Voice"]');
    if (voiceButton) {
        voiceButton.addEventListener('click', () => {
            alert('Voice input feature coming soon!');
        });
    }

    // Handle responsive menu
    const handleResize = () => {
        const container = document.querySelector('.max-w-4xl');
        if (window.innerWidth < 768) {
            container.classList.add('px-2');
        } else {
            container.classList.remove('px-2');
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
});

// Utility functions
const utils = {
    formatTimestamp: (date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    },

    scrollToTop: () => {
        document.getElementById('chat-messages').scrollTop = 0;
    },

    clearChat: () => {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <h2 class="text-2xl font-light mb-2">How can I help you today?</h2>
            </div>
        `;
    }
};

// Export for global use
window.ChatUtils = utils;
