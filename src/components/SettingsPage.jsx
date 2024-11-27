import React, { useState } from "react";
import { Form, Input, Switch, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    username: "",
    language: "en",
    notifications: true,
  });

  const handleSubmit = (values) => {
    console.log("提交的設定:", values);
    setSettings(values);
    message.success(t("settingsUpdated"));
  };

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    setSettings((prevSettings) => ({
      ...prevSettings,
      language: value,
    }));
  };

  return (
    <div className="max-w-sm mx-auto p-6 rounded-lg mt-24">
      <h2 className="text-center text-2xl mb-4">{t("settingsPageTitle")}</h2>
      <Form
        form={form}
        name="settingsForm"
        onFinish={handleSubmit}
        initialValues={settings}
        layout="vertical"
      >
        <Form.Item
          label={t("username")}
          name="username"
          rules={[{ required: true, message: t("enterUsername") }]}
        >
          <Input placeholder={t("usernamePlaceholder")} />
        </Form.Item>

        <Form.Item label={t("language")} name="language">
          <Select
            placeholder={t("selectLanguage")}
            onChange={handleLanguageChange}
          >
            <Option value="en">{t("english")}</Option>
            <Option value="zh">{t("chinese")}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t("notifications")}
          name="notifications"
          valuePropName="checked"
        >
          <Switch checkedChildren={t("on")} unCheckedChildren={t("off")} />
        </Form.Item>

        <Form.Item>
          <Button type="default" htmlType="submit" className="w-full">
            {t("saveSettings")}
          </Button>
        </Form.Item>
      </Form>

      <div className="flex justify-center mt-8">
        <Button
          type="default"
          onClick={() => navigate("/home")}
          className="mx-4"
        >
          {t("returnHome")}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
