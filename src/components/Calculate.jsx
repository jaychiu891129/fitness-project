import React, { useState } from "react";
import { Form, InputNumber, Select, Button, Radio, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

const Calculate = () => {
  const [bmr, setBMR] = useState(null);
  const [tdee, setTDEE] = useState(null);

  const calculateBMRandTDEE = (values) => {
    const { gender, age, height, weight, activityLevel } = values;
    let calculatedBMR;

    // BMR 計算
    if (gender === "male") {
      calculatedBMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    } else {
      calculatedBMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
    }
    setBMR(calculatedBMR.toFixed(0));

    // TDEE 計算
    const activityFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      high: 1.725,
      veryHigh: 1.9,
    };
    const calculatedTDEE = calculatedBMR * activityFactors[activityLevel];
    setTDEE(calculatedTDEE.toFixed(0));
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg  mt-8">
      <h2 className="text-center font-bold text-2xl mb-4">BMR & TDEE 計算器</h2>
      <Form layout="vertical" onFinish={calculateBMRandTDEE}>
        <Form.Item
          name="gender"
          label={<span className="text-base my-2">性別</span>}
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="male">男性</Radio>
            <Radio value="female">女性</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="age"
          label={<span className="text-base my-2">年齡</span>}
          rules={[{ required: true, message: "請輸入年齡" }]}
        >
          <InputNumber min={1} className="w-full" placeholder="年齡" />
        </Form.Item>

        <Form.Item
          name="height"
          label={<span className="text-base my-2">身高 (公分)</span>}
          rules={[{ required: true, message: "請輸入身高" }]}
        >
          <InputNumber min={1} className="w-full" placeholder="身高" />
        </Form.Item>

        <Form.Item
          name="weight"
          label={<span className="text-base my-2">體重 (公斤)</span>}
          rules={[{ required: true, message: "請輸入體重" }]}
        >
          <InputNumber min={1} className="w-full" placeholder="體重" />
        </Form.Item>

        <Form.Item
          name="activityLevel"
          label={<span className="text-base my-2">每週運動頻率</span>}
          rules={[{ required: true, message: "請選擇活動量" }]}
        >
          <Select placeholder="選擇活動量">
            <Option value="sedentary">久坐/沒在運動</Option>
            <Option value="light">每週低強度運動1-3天</Option>
            <Option value="moderate">每週中強度運動3-5天</Option>
            <Option value="high">每週高強度運動6-7天</Option>
            <Option value="veryHigh">每天運動兩次/勞力工作者</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="w-1/4 mx-auto block my-4"
          >
            計算
          </Button>
        </Form.Item>
      </Form>

      {/* 顯示結果 */}
      {bmr && tdee && (
        <div className="my-6 text-center">
          <Text className="block font-semibold text-lg mb-4">
            基礎代謝率 (BMR): {bmr} kcal/day
          </Text>
          <Text className="block font-semibold text-lg">
            每日總消耗量 (TDEE): {tdee} kcal/day
          </Text>
        </div>
      )}
    </div>
  );
};

export default Calculate;
