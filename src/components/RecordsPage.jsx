import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  List,
  Card,
  message,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { Option } = Select;

  // 用來儲存總運動時長和總消耗卡路里
  const [totalStats, setTotalStats] = useState({
    totalDuration: 0,
    totalCalories: 0,
  });

  // 當新增記錄時更新總統計數據
  const handleAddRecord = (values) => {
    const newRecord = {
      id: records.length + 1,
      date: values.date.format("YYYY-MM-DD"),
      activity: values.activity,
      duration: values.duration,
      calories: values.calories,
    };
    setRecords([...records, newRecord]);
    form.resetFields();
    message.success("健身記錄已新增");
  };

  // 當 records 改變時，更新總時長和總卡路里
  useEffect(() => {
    const totalDuration = records.reduce(
      (sum, record) => sum + record.duration,
      0
    );
    const totalCalories = records.reduce(
      (sum, record) => sum + record.calories,
      0
    );
    setTotalStats({ totalDuration, totalCalories });
  }, [records]);

  // 圖表數據
  const data = {
    labels: ["總運動時長", "總消耗卡路里"],
    datasets: [
      {
        label: "統計數據",
        data: [totalStats.totalDuration, totalStats.totalCalories],
        backgroundColor: ["#4CAF50", "#FF5722"],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 rounded-lg mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
        {/* Form區塊 */}
        <div className="md:col-span-1">
          <h3 className="text-xl mb-4 md:mb-6 text-center">建立紀錄</h3>
          <Form
            form={form}
            name="addRecordForm"
            onFinish={handleAddRecord}
            layout="vertical"
          >
            <Form.Item
              label={<span className="text-base my-2">日期</span>}
              name="date"
              rules={[{ required: true, message: "請選擇訓練日期!" }]}
            >
              <DatePicker
                defaultValue={moment()}
                format="YYYY-MM-DD"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-base my-2">運動名稱</span>}
              name="activity"
              rules={[{ required: true, message: "請輸入運動名稱!" }]}
            >
              <Select
                className="w-full"
                placeholder="例如：跑步、重訓、羽球等其他運動..."
              >
                <Option value="重訓">重訓</Option>
                <Option value="跑步">跑步</Option>
                <Option value="羽球">羽球</Option>
                <Option value="籃球">籃球</Option>
                <Option value="桌球">桌球</Option>
                <Option value="排球">排球</Option>
                <Option value="騎腳踏車">騎腳踏車</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-base my-2">運動時長 (分鐘)</span>}
              name="duration"
              rules={[{ required: true, message: "請輸入運動時長!" }]}
            >
              <InputNumber
                min={1}
                className="w-full"
                placeholder="輸入運動時長"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-base my-2">消耗卡路里</span>}
              name="calories"
              rules={[{ required: true, message: "請輸入消耗的卡路里!" }]}
            >
              <InputNumber
                min={1}
                placeholder="輸入消耗卡路里"
                className="w-full"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                className="block mx-auto w-1/2 md:w-1/4 mt-6"
              >
                新增
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* List區塊 */}
        <div className="md:col-span-1">
          <h3 className="text-xl mb-4 md:mb-6 text-center">已記錄的活動</h3>
          <List
            itemLayout="horizontal"
            dataSource={records}
            pagination={
              records.length > 4
                ? {
                    pageSize: 4, // 每頁顯示五筆記錄
                    className: "flex justify-center mt-4", // 置中分頁按鈕
                  }
                : false
            }
            renderItem={(record) => (
              <List.Item>
                <Card className="w-full border-none">
                  <h4 className="text-base inline mr-2">{record.activity}</h4>
                  <p className="inline mr-1">日期: {record.date} </p>
                  <p className="inline mr-2">{record.duration} 分鐘</p>
                  <p className="inline">卡路里: {record.calories} 大卡</p>
                </Card>
              </List.Item>
            )}
          />
        </div>

        {/* 總計圖表區塊 */}
        <div className="md:col-span-1 flex flex-col justify-end h-full">
          <Bar
            data={data}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecordsPage;
