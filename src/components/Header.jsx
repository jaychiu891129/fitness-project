import React, { useState } from "react";
import { Button, Menu, Typography, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { BarsOutlined, LogoutOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Header = () => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false); // 控制 Drawer 的顯示狀態

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const fitnessMenuItems = [
    { label: "運動紀錄", key: "records", onClick: () => navigate("/records") },
    { label: "重訓課表", key: "plan", onClick: () => navigate("/plan") },
    {
      label: "BMR/TDEE計算",
      key: "calculate",
      onClick: () => navigate("/calculate"),
    },
  ];

  const menuItems = [
    { label: "首頁", key: "home", onClick: () => navigate("/home") },
    {
      label: (
        <span className="cursor-pointer text-black lg:text-white">健身</span>
      ),
      key: "fitness",
      children: fitnessMenuItems,
    },
    {
      label: "交流區",
      key: "community",
      onClick: () => navigate("/community"),
    },
    { label: "朋友", key: "friends", onClick: () => navigate("/friends") },
    { label: "個人資料", key: "profile", onClick: () => navigate("/profile") },
    { label: "設定", key: "settings", onClick: () => navigate("/settings") },
  ];

  // 顯示 Drawer 菜單
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <header className="flex items-center justify-between bg-customBlue-900 p-4 drop-shadow-lg">
      <Title
        level={3}
        className="mb-0 cursor-pointer mt-2 ml-4 p-1 text-white"
        style={{ color: "white" }}
        onClick={() => navigate("/home")}
      >
        Fitness Track
      </Title>

      {/* 當螢幕小於lg時，顯示 Drawer 按鈕，並隱藏 Menu */}
      <div className="lg:hidden flex items-center">
        <Button className="" onClick={showDrawer}>
          <BarsOutlined />
          選單
        </Button>
        <Drawer
          title="選單"
          placement="left"
          onClose={closeDrawer}
          visible={drawerVisible}
        >
          <Menu
            mode="inline"
            items={menuItems}
            onClick={(e) => {
              menuItems.find((item) => item.key === e.key)?.onClick();
              closeDrawer(); // 點擊後自動關閉 Drawer
            }}
          />
        </Drawer>
      </div>

      {/* 這部分只會在螢幕大於lg時顯示 */}
      <div className="hidden lg:flex items-center flex-1 justify-center">
        <Menu
          mode="horizontal"
          items={menuItems.map((item) => ({
            ...item,
            style: { color: "white" }, // 為每個 Menu.Item 設定文字顏色為白色
          }))}
          className="flex-1 border-none bg-customBlue-900 justify-center"
        />
      </div>

      <Button
        onClick={handleLogout}
        type="default"
        style={{ padding: "1rem" }}
        className="ml-4 border-gray-300"
      >
        <LogoutOutlined /> 登出
      </Button>
    </header>
  );
};

export default Header;
