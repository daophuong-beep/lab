import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../stores/authSlice";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const onFinish = (values) => {
    dispatch(
      loginUser({
        username: values.username,
        password: values.password,
      })
    );
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="app-logo">
          <img src="/images/Logo.svg" alt="Logo" />
        </div>
      </div>

      <div className="login-form-wrapper">
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            initialValue="admin"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              className="custom-input"
              prefix={
                <div className="form-icon">
                  <img src="/images/user-icon.png" alt="User Icon" />
                </div>
              }
              placeholder="Tên đăng nhập"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              className="custom-input"
              prefix={
                <div className="form-icon">
                  <img src="/images/lock-icon.png" alt="Password Icon" />
                </div>
              }
              defaultValue="123456"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <div className="login-options">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lưu đăng nhập</Checkbox>
            </Form.Item>
            <span>Bạn quên mật khẩu?</span>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-btn"
              block
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="login-footer">
        <p>
          Nếu bạn có thắc mắc hay cần giải đáp, vui lòng liên hệ số điện thoại:
          <b>19001000</b>
        </p>
        <p>Bản quyền thuộc về AnyBim</p>
      </div>
      <div className="login-footer-img">
        <img src="/images/footer-image.png" alt="Login Footer"/>
      </div>
    </div>
  );
};

export default LoginPage;
