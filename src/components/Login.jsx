import React, { useState } from "react";
import { Button, Input, Typography, Alert } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        navigate("/home");
      } else {
        setError("登入失敗，請確認帳號和密碼");
      }
    } catch (error) {
      setError("登入請求出現問題，請稍後再試");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-md">
        <Title level={2} className="text-center">
          登入
        </Title>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label>用戶名</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label>密碼</label>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <Button type="default" htmlType="submit" className="w-full">
            登入
          </Button>
          {error && <Alert message={error} type="error" className="mt-4" />}
        </form>
      </div>
    </div>
  );
};

export default Login;
