<img width="1280" alt="image" src="https://github.com/user-attachments/assets/22518d5b-cf14-4c41-af9f-c6eb99156147">
<img width="1280" alt="image" src="https://github.com/user-attachments/assets/24e72cdb-25f0-489b-b553-c6dbc0ad2b61">


## Tech Stack

### Backend
- JavaScript
- WebSockets

### Frontend
- ReactJS

## How to Run

1. Navigate to the backend directory:
    ```bash
    cd Backend/src
    ```

2. Install the backend dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    node index.js
    ```

4. Navigate to the frontend directory:
    ```bash
    cd ../Frontend
    ```

5. Install the frontend dependencies:
    ```bash
    npm install
    ```

6. Start the frontend development server:
    ```bash
    npm run dev
    ```
## How to Test the WebSocket Server

1. Open two tabs in your web browser.

2. Go to [Hoppscotch WebSocket Testing Tool](https://hoppscotch.io/realtime/websocket) in both tabs.

3. In each tab, enter the WebSocket URL: `ws://localhost:8080` and click on **Connect** to establish a WebSocket connection.

4. Send the following message in both tabs:

    ```json
    {
      "type": "init_game",
      "order": "your_order_array"   // Example: ["P1", "P2", "P3", "H1", "H2"]
    }
    ```
## Actions and Their Respective Messages

### 1. Get Available Moves

To request available moves for a piece, send the following message:

```json
{
    "type": "available_moves",
    "piece": "your_piece"  // Example: "P1"
}
```
### 2. Move a Piece

To move a piece, send the following message:

```json
{
    "type": "move",
    "piece": "your_piece",   // Example: "P1"
    "move": "your_move"      // Example: "F"
}
