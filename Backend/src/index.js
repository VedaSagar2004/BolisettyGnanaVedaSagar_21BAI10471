import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager.js';

// creates a new websocket connection on port 8080 and a instance of the GameManager class
const wss = new WebSocketServer({ port: 8080 });
console.log("Listening to 8080")
const gameManager = new GameManager()

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  gameManager.addUser(ws)
  ws.on("disconnect", () => gameManager.removeUser(ws))
});