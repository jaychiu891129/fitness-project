import React, { useState } from "react";
import { Button, List, Avatar, Card } from "antd";
import { useNavigate } from "react-router-dom";
import ChatRoom from "./ChatRoom"; // 引入 ChatRoom 組件

const FriendsPage = () => {
  const [friends, setFriends] = useState([
    {
      name: "John Doe",
      id: 1,
      avatar: "https://www.example.com/avatar1.jpg",
    },
    {
      name: "Jane Smith",
      id: 2,
      avatar: "https://www.example.com/avatar2.jpg",
    },
    // 更多朋友資料...
  ]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenChat = (friend) => {
    setSelectedFriend(friend);
    setIsChatOpen(true);
  };

  return (
    <div className="friends-page max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-center text-2xl sm:text-3xl mb-6">朋友列表</h2>

      <List
        grid={{
          gutter: 16,
          xs: 1, // 手機：每行 1 個
          sm: 2, // 平板小屏：每行 2 個
          md: 3, // 平板大屏：每行 3 個
          lg: 4, // 桌面：每行 4 個
        }}
        dataSource={friends}
        renderItem={(friend) => (
          <List.Item>
            <Card
              hoverable
              className="flex flex-col items-center"
              cover={
                <Avatar
                  src={friend.avatar}
                  size={64}
                  alt={friend.name}
                  className="mx-auto my-4"
                />
              }
            >
              <Card.Meta title={friend.name} />
              <Button
                type="default"
                className="mt-4 w-full"
                onClick={() => navigate(`/user/${friend.id}`)}
              >
                查看
              </Button>
              <Button
                type="default"
                className="mt-2 w-full"
                onClick={() => handleOpenChat(friend)}
              >
                聊天
              </Button>
            </Card>
          </List.Item>
        )}
      />

      {isChatOpen && selectedFriend && (
        <div className="fixed bottom-0 right-0 m-4 w-full max-w-md">
          <ChatRoom friendName={selectedFriend.name} />
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
