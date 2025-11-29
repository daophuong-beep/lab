import React, { useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Avatar,
  Typography,
  Row,
  Col,
  message,
} from "antd";
import { UserOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./ProfilePage.css";
const { Title, Text } = Typography;
const { Option } = Select;

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  // Đổ dữ liệu từ Redux vào Form khi trang được load
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        dob: user.dob ? dayjs(user.dob, "YYYY-MM-DD") : null,
        gender: user.gender,
        companyAddress: user.companyAddress,
        homeAddress: user.homeAddress,
      });
    }
  }, [user, form]);

  const onFinish = (values) => {
    // Ở đây bạn sẽ gọi API để cập nhật thông tin user
    console.log("Updated values:", values);
    message.success("Cập nhật hồ sơ thành công!");
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
        <Avatar
          size={100}
          src={user.avatar}
          icon={<UserOutlined />}
          style={{ border: "2px solid #ddd" }}
        />
        <div
          style={{
            marginLeft: 84,
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          <span
            className="default-typography"
            style={{ margin: 0, fontSize: 48 }}
          >
            {user.name}
          </span>
          <span className="default-typography" style={{ fontSize: 36, fontWeight:400 }}>
            Email: {user.email}
          </span>
        </div>
      </div>

      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        size="large"
      >
        <Form.Item label="Date of birth" name="dob">
          <DatePicker
            format="DD/MM/YYYY"
            style={{ width: 120 }}
            className="datepicker"
          />
        </Form.Item>

        <Form.Item label="Sex" name="gender">
          <Select
            className="select"
            style={{ width: 120, border: "none", borderRadius: 0 }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Address Company" name="companyAddress">
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 3 }}
            style={{
              maxWidth: "350px",
              border: "none",
              borderRadius: 0,
              borderBottom: "1px solid #000000",
            }}
            readOnly
          />
        </Form.Item>

        <Form.Item label="Address Home" name="homeAddress">
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 3 }}
            style={{
              maxWidth: "350px",
              border: "none",
              borderRadius: 0,
              borderBottom: "1px solid #000000",
            }}
            readOnly
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
