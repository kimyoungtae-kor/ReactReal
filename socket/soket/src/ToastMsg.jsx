
import React, { useEffect, useState } from 'react';
import { getWebSocket } from './websocket';
import toast, {Toaster} from 'react-hot-toast'



const ToastMsg = () => {
  const [sender,setSender] = useState('');
  const [message,setMessage] = useState([]);
  const [input,setInput] = useState('');
  
  useEffect(() => {
    if (window.Android) {
      alert("Android 인터페이스가 연결되었습니다.");
  } else {
      alert("Android 인터페이스가 연결되지 않았습니다.");
  }
    const ws = getWebSocket();
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log("Received message:", message);
  
      setMessage((prev) => [...prev, message]);
  
      toast(`${message.content}`, {
        duration: 4000,
        position: 'top-right',
      });
       // Android WebView에 메시지 전달
    if (window.Android) {
      window.Android.sendBroadcast(message.content);
      console.log(" 전소ㅇ완료");
    }

    
    };
  
    return () => {
      ws.onmessage = null; 
    };
  }, []);

  const sendMessage = () => {
    alert(";;")
    const ws = getWebSocket()
    if(ws.readyState === WebSocket.OPEN && input.trim()){
      const message = {content : input}
      
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
      <h3>Mssage</h3>
     
      <input type='text' value={input} onChange={e => setInput(e.target.value)}/>
      
      <button onClick={sendMessage}>send</button>
    </div>
  );
}

export default ToastMsg;
