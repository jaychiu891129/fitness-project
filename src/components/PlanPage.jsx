import React, { useState } from "react";
import { Form, Input, Button, Select, List, Card, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const PlanPage = () => {
  const [plans, setPlans] = useState({});
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState({});
  const navigate = useNavigate();

  // 處理新增訓練計劃
  const handleAddPlan = (values) => {
    const { muscleGroup, exercise, sets, reps } = values;

    setPlans((prevPlans) => {
      const updatedPlans = { ...prevPlans };

      // 若肌群已存在，則新增動作到該肌群，否則新增新的肌群
      if (updatedPlans[muscleGroup]) {
        updatedPlans[muscleGroup].push({ exercise, sets, reps });
      } else {
        updatedPlans[muscleGroup] = [{ exercise, sets, reps }];
      }

      return updatedPlans;
    });

    form.resetFields();
    message.success("訓練計劃已新增");
  };

  const handleDelete = (index, muscleGroup) => {
    const newPlans = { ...plans };
    newPlans[muscleGroup].splice(index, 1); // 刪除對應的動作
    setPlans(newPlans); // 更新狀態
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 rounded-lg mt-8">
      <h2 className="text-center text-2xl sm:text-3xl mb-6">重訓課表</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {/* 表單區塊 */}
        <div className="md:col-span-1">
          <h3 className="text-lg sm:text-xl mb-4 text-center">新增訓練計劃</h3>
          <Form
            form={form}
            name="addPlanForm"
            onFinish={handleAddPlan}
            layout="vertical"
          >
            <Form.Item
              label={<span className="text-base my-2">選擇肌群</span>}
              name="muscleGroup"
              rules={[{ required: true, message: "請選擇要訓練的肌群!" }]}
            >
              <Select placeholder="選擇肌群">
                <Option value="胸部">胸部</Option>
                <Option value="肩部">肩部</Option>
                <Option value="背部">背部</Option>
                <Option value="腿部">腿部</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-base my-2">動作名稱</span>}
              name="exercise"
              rules={[{ required: true, message: "請輸入動作名稱!" }]}
            >
              <Input
                className="w-full"
                placeholder="例如：臥推、啞鈴肩推、深蹲 ..."
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-base my-2">組數</span>}
              name="sets"
              rules={[{ required: true, message: "請輸入組數!" }]}
            >
              <Input className="w-full" placeholder="例如：4組" />
            </Form.Item>

            <Form.Item
              label={<span className="text-base my-2">每組次數</span>}
              name="reps"
              rules={[{ required: true, message: "請輸入每組次數!" }]}
            >
              <Input className="w-full" placeholder="例如：10次" />
            </Form.Item>

            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                className="block w-1/2 sm:w-1/4 mx-auto my-4"
              >
                新增
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* 訓練計劃列表區塊 */}
        <div className="md:col-span-2">
          <h3 className="text-lg sm:text-xl mb-4 text-center">已排定的課表</h3>
          <List
            itemLayout="horizontal"
            dataSource={Object.keys(plans)}
            renderItem={(muscleGroup) => (
              <List.Item className="flex-col sm:flex-row">
                <Card className="w-full mb-4 sm:mb-0">
                  <h3 className="font-bold text-lg mb-4">
                    肌群: {muscleGroup}
                  </h3>
                  {plans[muscleGroup].map((exercise, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-4 gap-4">
                        <p className="text-sm">
                          動作:
                          {exercise.exercise}
                        </p>
                        <p className="text-sm text-center">
                          組數:
                          {exercise.sets}
                        </p>
                        <p className="text-sm text-end">
                          每組次數:
                          {exercise.reps}
                        </p>
                        <button
                          className="text-red-500 text-sm hover:text-red-700"
                          onClick={() => handleDelete(index, muscleGroup)}
                        >
                          刪除
                        </button>
                      </div>
                      <hr className="my-2" />
                    </div>
                  ))}
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
