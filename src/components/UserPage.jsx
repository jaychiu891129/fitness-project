import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Avatar, Spin, Typography } from "antd";

const { Title, Text } = Typography;

const UserPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模擬取得資料的 API 請求
    const fetchProfile = async () => {
      setLoading(true);
      // 假設此端點返回與 ProfilePage.jsx 相同格式的個人資料
      const response = await fetch(`/api/profile/${id}`);
      const data = await response.json();
      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <Spin tip="加載中..." />;
  }

  return (
    <div className="user-profile-page max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <Card>
        <div className="flex items-center">
          <Avatar src={profile.avatar} size={64} className="mr-4" />
          <Title level={3}>{profile.name}</Title>
        </div>
        <Text>性別: {profile.gender}</Text>
        <Text>身高: {profile.height}</Text>
        <Text>體重: {profile.weight}</Text>
        <Text>自我簡介: {profile.intro}</Text>
      </Card>
    </div>
  );
};

export default UserPage;
