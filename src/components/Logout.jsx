import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <Button onClick={handleLogout} type="default" className="mt-4 ">
      登出
    </Button>
  );
};

export default Logout;
