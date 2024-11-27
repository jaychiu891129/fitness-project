import React, { useState } from "react";
import { Input, Button, List, Typography } from "antd";

const { Title } = Typography;

const ChatRoom = ({ friendName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: "Me", text: message }]);
      setMessage(""); // 清空輸入框
    }
  };

  return (
    <div className="chat-room">
      <Title level={4}>與 {friendName} 聊天</Title>

      <div className="chat-box">
        <List
          dataSource={messages}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <strong>{item.sender}:</strong> {item.text}
            </List.Item>
          )}
        />
      </div>

      <div className="message-input">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="輸入訊息..."
        />
        <Button onClick={handleSendMessage} type="default" className="mt-2">
          發送
        </Button>
      </div>
    </div>
  );
};

export default ChatRoom;
