import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../stores/authSlice';
import './LoginPage.css';

// Logo giả lập (Bạn thay bằng thẻ img src={logo} nhé)
const LogoAnyBim = () => (
  <div className="app-logo">
    ANY <br/> BIM
  </div>
);

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Lấy state từ Redux
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Nếu đăng nhập thành công thì chuyển trang
  useEffect(() => {
    if (isAuthenticated) {
      message.success('Đăng nhập thành công!');
      navigate('/'); // Chuyển về trang chủ/Shop
    }
  }, [isAuthenticated, navigate]);

  // Hiển thị lỗi nếu có
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const onFinish = (values) => {
    // Gọi action Redux
    dispatch(loginUser({ 
      username: values.username, 
      password: values.password 
    }));
  };

  return (
    <div className="login-container">
      {/* Header / Logo */}
      <div className="login-header">
        <LogoAnyBim />
      </div>

      {/* Form Area */}
      <div className="login-form-wrapper">
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          {/* Username Input */}
          <Form.Item
            name="username"
            className="custom-input"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#00AEEF' }} />} 
              placeholder="Tên đăng nhập" 
            />
          </Form.Item>

          {/* Password Input */}
          <Form.Item
            name="password"
            className="custom-input"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#00AEEF' }} />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          {/* Options: Remember Me & Forgot Password */}
          <div className="login-options">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lưu đăng nhập</Checkbox>
            </Form.Item>
            <span className="forgot-password">
              Bạn quên mật khẩu?
            </span>
          </div>

          {/* Submit Button */}
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

      {/* Footer */}
      <div className="login-footer">
        <p>Nếu bạn có thắc mắc hay cần giải đáp, vui lòng liên hệ số điện thoại: <b>19001000</b></p>
        <p>Bản quyền thuộc về AnyBim</p>
      </div>
    </div>
  );
};

export default LoginPage;