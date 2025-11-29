import { Layout, Menu, Avatar, Typography, Space } from "antd";
import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MainLayout.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  // Logic xác định đang ở menu nào để highlight
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes("/cart")) return "cart";
    if (path.includes("/profile")) return "profile";
    return "shop";
  };

  return (
    <Layout className="main-layout main-layout-typography">
      <Header className="layout-header">
        <Space>
          <div
            style={{
              width: 98,
              height: 86,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/images/layout-logo.png" alt="logo" />
          </div>
          <div className="layout-header-title">Mobile Shopping</div>
        </Space>

        <Space>
          <Avatar style={{ width: 69, height: 69 }} src={user?.avatar} />
        </Space>
      </Header>

      <Layout style={{ flex: 1, flexDirection: "row" }}>
        <Sider
          width={243}
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
          style={{ borderRight: "1px solid #f0f0f0" }}
        >
          <div className="header-menu">
            <span className="default-typography" style={{ fontSize: 24 }}>
              Menu
            </span>
            <div
              style={{
                width: 23,
                height: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src="/images/menu-icon.png" />
            </div>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            style={{ borderRight: 0, marginTop: 10 }}
            onClick={({ key }) => navigate(key === "shop" ? "/" : `/${key}`)}
            items={[
              { label: "Shop", key: "shop", icon: <ShopOutlined /> },
              { label: "Cart", key: "cart", icon: <ShoppingCartOutlined /> },
              { label: "My Profile", key: "profile", icon: <UserOutlined /> },
            ]}
          />
        </Sider>

        <Content style={{ width: "100%", backgroundColor: "white" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
