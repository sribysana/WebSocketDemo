/**
 * Initialize DOM elements and set up event listeners for sending messages.
 * Also, define the WebSocket connection and message handling logic.
 */

// Get the input element for user messages
var input = document.getElementById('message-input');

/**
 * Display a message in the message list using a template.
 * @param {string} timestamp - The time the message was received.
 * @param {string} content - The message content.
 */
const displayMessage = (timestamp, content) => {
    console.log(`Message received at ${timestamp}: ${content}`);
    // Clone the message template
    const template = document.getElementById('message-template').content.cloneNode(true);
    // Set template fields
    template.querySelector('.post').textContent = input.value;
    template.querySelector('.timestamp').textContent = timestamp;
    template.querySelector('.content').textContent = content;
    // Append the message to the message list
    document.getElementById('messageList').appendChild(template);
    // Clear the input field
    input.value = '';
};

// WebSocket instance (reused for the session)
let ws;

/**
 * Set up the WebSocket connection and define event handlers.
 */
function setupWebSocket() {
    // Only create a new connection if one doesn't exist or is closed
    if (!ws || ws.readyState === WebSocket.CLOSED) {
        ws = new WebSocket('ws://localhost:3000');
        ws.onopen = () => {
            console.log('WebSocket connection established');
        };
        ws.onmessage = (event) => {
            // Parse incoming message and display it
            const data = JSON.parse(event.data);
            displayMessage(data.timestamp, data.message);
        };
        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
        ws.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
    }
}

// Initialize the WebSocket connection
setupWebSocket();

/**
 * Send the current input value as a message over the WebSocket.
 */
const sendMessage = () => {
    const message = input.value;
    // Only send if message is not empty and WebSocket is open
    if (message && ws && ws.readyState === WebSocket.OPEN) {
        ws.send(message);
    }
};

