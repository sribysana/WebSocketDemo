import express from 'express';
import {WebSocketServer} from 'ws';
// import {createServer} from 'http';
const app = express();
const port = 3000;

// Create an HTTP server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

const wss = new WebSocketServer({ server });
// Handle WebSocket connections

wss.on('connection', ws=>{
    console.log('New client connected');
    ws.on('message', (data, isBinary=true)=>{
        const message = isBinary ? data : data.toString();
        console.log('Received text:', message);
        console.log('Received message from client',data, isBinary);

        ws.send(JSON.stringify({timestamp: Date.now(), message: 'Hello from server!' }));
    });
})
