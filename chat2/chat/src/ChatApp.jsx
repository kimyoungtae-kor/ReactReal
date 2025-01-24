import React, { useEffect, useState } from 'react';
import { getWebSocket } from './websocket';



const ChatApp = () => {
  const [sender,setSender] = useState('');
  const [message,setMessage] = useState([]);
  const [input,setInput] = useState('');
  
  useEffect(() => {
    const ws = getWebSocket()
    ws.onmessage = e => {
      const message = JSON.parse(e.data)
      console.log(message)
      setMessage(prev => [...prev,message])
      return () => ws.close()
    }
  },[]);

  const sendMessage = () => {
    const ws = getWebSocket()
    if(ws.readyState === WebSocket.OPEN && input.trim()){
      const message = {sender,content : input,timestamp:new Date().getTime()}
      
      console.log(message)
      ws.send(JSON.stringify(message))
      setInput("");
    }
  }
  const handleSender = e => {
    setSender(e.target.value);
  }
  return (
    <div>
      <h3>Chat App</h3>
      <div style={{height:300, overflow:"scroll",border:"1px solid black"}}>
        {message.map((msg,index) => <div key = {index}><strong>{msg.sender}</strong> : {msg.content}</div>)}
      </div>
      <input type = 'text' value={sender} onChange={handleSender}></input>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}/>
      <button onClick={sendMessage}>send</button>
    </div>
  );
}

export default ChatApp;
