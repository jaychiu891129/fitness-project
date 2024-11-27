import React from "react";
import { Button, Card, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import Clock from "./Clock";
import Weather from "./Weather";
import { RightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* 新增 Clock 和 Weather 組件區塊 */}
      <div className="max-w-6xl mx-auto p-6 bg-customBlue-200 bg-opacity-60 text-customBlue-950 shadow-lg rounded-lg mt-12">
        <Row gutter={16}>
          <Col xs={24} sm={12} className="mb-4 sm:mb-0">
            <Clock />
          </Col>
          <Col xs={24} sm={12}>
            <Weather />
          </Col>
        </Row>
      </div>

      {/* 原來的健身應用描述和功能卡片 */}
      <div className="max-w-6xl mx-auto p-6  rounded-lg mt-6 mb-12 ">
        <Paragraph className="text-center text-base text-customBlue-950 mb-8">
          這是一個簡單的健身追蹤應用，你可以在這裡管理你的個人資料、設置目標並追蹤你的進度。
        </Paragraph>

        <Row gutter={16} justify="center">
          {[
            {
              title: "個人資料",
              icon: "fas fa-user",
              path: "/profile",
              description: "個人資訊，包括身高、體重等。",
            },
            {
              title: "運動記錄",
              icon: "fas fa-dumbbell",
              path: "/records",
              description: "查看和管理你的健身記錄。",
            },
            {
              title: "重訓計畫",
              icon: "fas fa-clipboard",
              path: "/plan",
              description: "規劃你的訓練，持續進行。",
            },
            {
              title: "BMR/TDEE計算",
              icon: "fas fa-calculator",
              path: "/calculate",
              description: "計算自己的BMR/TDEE。",
            },
            {
              title: "交流區",
              icon: "fas fa-comments",
              path: "/community",
              description: "秀出你的成果，與他人交流。",
            },
            {
              title: "朋友",
              icon: "fas fa-user-friends",
              path: "/friends",
              description: "和夥伴互相督促一同進步。",
            },
          ].map((item, index) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              key={index}
              className="mb-2 sm:mb-0"
            >
              <Card
                title={
                  <div className="flex text-customBlue-950 text-lg items-center">
                    <i className={`${item.icon} mr-3`}></i> {item.title}
                  </div>
                }
                bordered={false}
                className="m-4 hover:shadow-xl hover:scale-105 duration-200 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 "
                style={{ background: "rgba(255, 255, 255, 0.6)" }}
              >
                <p className="text-customBlue-950">{item.description}</p>
                <Button
                  type="default"
                  onClick={() => navigate(item.path)}
                  className="mt-4 flex border-none text-customBlue-950 hover:bg-customBlue-200 hover:text-customBlue-950 items-center"
                >
                  前往 <RightOutlined />
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
