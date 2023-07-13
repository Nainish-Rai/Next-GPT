"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

const ChatGPTStream: React.FC = () => {
  const [chat, setChat] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const streamChat = async () => {
      const response = await fetch(
        "http://127.0.0.1:5328/api/chat/tell me a joke"
      );
      let reader;
      if (response.body != null) reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let data = "";
      let done = false;

      while (!done && reader) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        data += decoder.decode(value);
        if (data.includes("\n")) {
          const messages = data.split("\n");
          setChat((prevChat) => [...prevChat, ...messages]);
          data = "";
        }
      }
    };

    streamChat();

    return () => {
      // Cleanup code here
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setChat((prevChat) => [...prevChat, `You: ${message}`]);
      setMessage("");
      sendMessageToServer(message);
    }
  };

  const sendMessageToServer = (message: string) => {
    // Send the user message to the server for processing
    // You can use WebSocket or any other communication mechanism here
    // Example: WebSocket implementation
    // webSocketInstance.send(JSON.stringify({ message }));
  };

  return (
    <div>
      <h1>Chat with ChatGPT:</h1>
      <div className="chat-container">
        {chat.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={message} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatGPTStream;
