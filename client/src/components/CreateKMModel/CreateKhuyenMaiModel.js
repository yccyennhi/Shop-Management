import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";

const CreateKhuyenMaiForm = () => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Mã khuyến mãi">
          <Input />
        </Form.Item>
        <Form.Item label="Tên chương trình">
          <Input />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Ngày kết thúc">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Số lượng">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Trị giá hóa đơn">
          <InputNumber />
          <span className="ant-form-text"> VNĐ </span>
        </Form.Item>
        <Form.Item label="Phần trăm giảm">
          <Form.Item name="input-number" noStyle>
            <InputNumber min={1} max={100} />
          </Form.Item>
          <span className="ant-form-text"> %</span>
        </Form.Item>
        <Form.Item label="Trạng thái" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

ReactDOM.render(<CreateKhuyenMaiForm />, mountNode);
