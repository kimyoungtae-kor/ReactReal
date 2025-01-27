import React, { useEffect } from 'react';
import { getWebSocket } from './websocket';
import toast, {Toaster} from 'react-hot-toast'

const Test1 = () => {

  useEffect(() => {
    const ws = getWebSocket();
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log("메시지받음:", message);
  
      toast(`${message.content}`, {
        duration: 4000,
        position: 'top-right',
      });
    };
  
    return () => {
      ws.onmessage = null; 
    };
  }, []);
  return (
    <div>
      <h1>테스트 페이지</h1>
    </div>
  );
}

export default Test1;
