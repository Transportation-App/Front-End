import { useEffect, useState } from "react";

const useWebSocket = (url: string, itinID?: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      if (itinID) {
        const message = JSON.stringify({
          type: "SEND_ITIN_ID",
          data: { itinID },
        });
        ws.send(message);
      }
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [url, itinID]);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.warn(`WebSocket is not open. Message not sent: ${message}`);
    }
  };

  return {
    messages,
    sendMessage,
    socket,
  };
};

export default useWebSocket;
