import React from "react";
import { Typography } from "antd";

const { Text, Link } = Typography;

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center p-4 bg-customBlue-900 text-white">
      <Text className="mb-2 text-white">&copy; 2024 我的應用. 版權所有.</Text>
      <div className="flex space-x-4">
        <Link href="/about" className="text-white hover:text-gray-400">
          關於作者
        </Link>
        <Link href="/privacy" className="text-white hover:text-gray-400">
          隱私政策
        </Link>
        <Link href="/terms" className="text-white hover:text-gray-400">
          使用條款
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
