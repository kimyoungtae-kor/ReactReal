let ws;
export const getWebSocket = () => {
  if(!ws || ws.readyState === WebSocket.CLOSED){
    const wsUrl = window.location.hostname == "localhost" ? "ws://localhost:8080/chat" : "ws://10.0.2.2:8080/chat"
    ws = new WebSocket(wsUrl)
    ws.onopen = () => console.log("WebSocket 연결 성공");
  }
  return ws;
}
export const initWebSocket = (onMessageCallback) => {
  const ws = getWebSocket();
  ws.onmessage = (e) => {
    const message = JSON.parse(e.data);
    onMessageCallback(message);
  };
};