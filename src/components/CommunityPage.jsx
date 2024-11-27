import React, { useState } from "react";
import { Form, Input, Button, List, Card, Avatar, message, Upload } from "antd";
import {
  LikeOutlined,
  CommentOutlined,
  UserAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);

  // 處理發表新帖子
  const handlePostSubmit = (values) => {
    const newPost = {
      id: posts.length + 1,
      content: values.content,
      image: imageUrl,
      likes: 0,
      comments: [],
      date: new Date(),
    };
    setPosts([...posts, newPost]);
    form.resetFields();
    setImageUrl(null); // 清空圖片
    message.success("帖子發佈成功");
  };

  // 處理圖片上傳
  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      // 取得上傳圖片的 URL (假設這裡使用本地 URL)
      const fileUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(fileUrl);
    }
  };

  // 處理留言
  const handleAddComment = (postId, comment) => {
    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    });
    setPosts(newPosts);
  };

  // 處理按讚
  const handleLikePost = (postId) => {
    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
        };
      }
      return post;
    });
    setPosts(newPosts);
  };

  // 處理加好友
  const handleAddFriend = (postId) => {
    const newPost = posts.find((post) => post.id === postId);
    if (!newPost) return;

    const newFriend = `用戶#${newPost.id}`;
    setFriends([...friends, newFriend]);
    message.success(`${newFriend} 已經加為朋友！`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-center text-2xl mb-4">交流專區</h2>

      {/* 發表帖子表單 */}
      <Form
        form={form}
        name="postForm"
        onFinish={handlePostSubmit}
        layout="vertical"
        className="mb-6"
      >
        <Form.Item
          label="發表你的貼文"
          name="content"
          rules={[{ required: true, message: "請輸入貼文內容!" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="分享你的健身經歷或想法、展現你/妳的運動成果"
          />
        </Form.Item>

        <Form.Item label="上傳圖片 (可選)">
          <Upload
            listType="picture"
            beforeUpload={() => false} // 防止自動上傳
            onChange={handleImageUpload}
            showUploadList={false} // 隱藏上傳列表
          >
            <Button icon={<UploadOutlined />}>選擇圖片</Button>
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Post Image"
              className="w-full mt-4"
              style={{ maxHeight: "200px" }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="default" htmlType="submit" className="w-full">
            發佈貼文
          </Button>
        </Form.Item>
      </Form>

      {/* 帖子列表 */}
      <List
        itemLayout="vertical"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item key={post.id}>
            <Card className="w-full">
              <div className="flex items-center mb-4">
                <Avatar>{post.id}</Avatar>
                <div className="ml-4">
                  <p className="font-semibold">用戶#{post.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* 帖子內容 */}
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post Image"
                  className="w-full mt-4"
                  style={{ maxHeight: "200px" }}
                />
              )}

              {/* 按讚和留言 */}
              <div className="flex justify-between items-center mt-4">
                <Button
                  icon={<LikeOutlined />}
                  onClick={() => handleLikePost(post.id)}
                  type="text"
                >
                  {post.likes} 個讚
                </Button>

                <Button
                  icon={<UserAddOutlined />}
                  onClick={() => handleAddFriend(post.id)}
                  type="text"
                >
                  加為朋友
                </Button>

                <div className="flex items-center">
                  <Input
                    placeholder="留言..."
                    onPressEnter={(e) =>
                      handleAddComment(post.id, e.target.value)
                    }
                    className="mr-2"
                  />
                  <Button icon={<CommentOutlined />} type="text">
                    留言
                  </Button>
                </div>
              </div>

              {/* 留言顯示 */}
              <div className="mt-4">
                {post.comments.length > 0 ? (
                  <ul>
                    {post.comments.map((comment, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">暫無留言</p>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />

      <div className="flex justify-center mt-8">
        <Button
          type="default"
          onClick={() => navigate("/home")}
          className="mx-4"
        >
          返回首頁
        </Button>
      </div>
    </div>
  );
};

export default CommunityPage;
