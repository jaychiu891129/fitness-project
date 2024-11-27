import React, { useState } from "react";
import {
  Input,
  Button,
  Form,
  Upload,
  message,
  Typography,
  Select,
  InputNumber,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const { Option } = Select;

  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      message.success("大頭照上傳成功！");
      setAvatar(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error("大頭照上傳失敗！");
    }
  };

  const onFinish = (values) => {
    console.log("Form values: ", values);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg mt-8">
      <Title className="text-center" level={2}>
        個人資料
      </Title>
      {/* 大頭照上傳 */}
      <div className="my-12">
        <Upload
          name="avatar"
          showUploadList={false}
          action="/upload-avatar"
          onChange={handleAvatarChange}
        >
          <Button icon={<UploadOutlined />}>上傳大頭照</Button>
        </Upload>
        {avatar && (
          <img
            src={avatar}
            alt="avatar"
            className="mt-4 w-32 h-32 rounded-full"
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              name: "",
              age: "",
              gender: "",
              birthday: "",
              height: "",
              weight: "",
              intro: "",
              email: "",
            }}
          >
            <Form.Item
              label={<span className="text-base">姓名</span>}
              name="name"
              rules={[{ required: true, message: "請輸入姓名!" }]}
            >
              <Input className="w-3/4" />
            </Form.Item>

            <Form.Item
              label={<span className="text-base">年齡</span>}
              name="age"
              rules={[{ required: true, message: "請輸入年齡!" }]}
            >
              <InputNumber className="w-3/4" />
            </Form.Item>

            <Form.Item
              name="gender"
              label={<span className="text-base">性別</span>}
              rules={[{ required: true, message: "請選擇性別!" }]}
            >
              <Select style={{ width: "310px" }} placeholder="選擇你/妳的性別">
                <Option value="male">男性</Option>
                <Option value="female">女性</Option>
                <Option value="other">其他</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-base">生日</span>}
              name="birthday"
              rules={[{ required: true, message: "請輸入生日!" }]}
            >
              <DatePicker className="w-3/4" />
            </Form.Item>
          </Form>
        </div>

        <div>
          {/* 身高、體重、自我介紹、E-mail */}
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<span className="text-base">身高(cm)</span>}
              name="height"
              rules={[{ required: true, message: "請輸入身高!" }]}
            >
              <Input className="w-3/4" />
            </Form.Item>

            <Form.Item
              label={<span className="text-base">體重</span>}
              name="weight"
              rules={[{ required: true, message: "請輸入體重!" }]}
            >
              <Input className="w-3/4" />
            </Form.Item>

            <Form.Item
              label={<span className="text-base">E-mail</span>}
              name="email"
              rules={[{ required: true, message: "請輸入 email!" }]}
            >
              <Input className="w-3/4" />
            </Form.Item>

            <Form.Item
              name="intro"
              label={<span className="text-base">自我介紹</span>}
              rules={[{ required: true, message: "請輸入自我介紹!" }]}
            >
              <Input.TextArea className="w-3/4" showCount maxLength={100} />
            </Form.Item>
          </Form>
        </div>
      </div>
      <Button type="default" htmlType="submit" className="mx-auto block mt-16">
        儲存
      </Button>
    </div>
  );
};

export default ProfilePage;
