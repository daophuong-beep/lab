import {
  List,
  Button,
  Typography,
  Image,
  Row,
  Col,
  Divider,
  Empty,
} from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../../stores/cartSlice";

const { Title, Text } = Typography;

const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  // Tính toán tổng tiền
  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(amount)
      .replace("₫", "VNĐ");
  };

  // Nếu giỏ hàng trống
  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Empty description="Giỏ hàng trống trơn" />
      </div>
    );
  }

  return (
    <div>
      <div className="default-typography" style={{ margin: 20 }}>
        Card
      </div>
      <div
        className="default-typography"
        style={{
          textAlign: "right",
          fontSize: 20,
          fontWeight: "400",
          marginBottom: 15,
        }}
      >
        {items.length} Items in bag
      </div>

      <List
        style={{ borderTop: "1px solid #f0f0f0" }}
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            style={{ padding: "20px 0", borderBottom: "1px solid #f0f0f0" }}
            actions={[
              <div
                key="actions"
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <Button
                  style={{ border: "none" }}
                  icon={<PlusOutlined />}
                  onClick={() => dispatch(increaseQuantity(item.id))}
                />

                <Text strong>{item.quantity}</Text>
                <Button
                  style={{ border: "none" }}
                  icon={<MinusOutlined />}
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  // disabled={item.quantity <= 1}
                />
              </div>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Image
                  width={80}
                  src={item.image}
                  style={{ objectFit: "contain" }}
                />
              }
              title={
                <Text strong style={{ fontSize: 16 }}>
                  {item.name}
                </Text>
              }
              description={
                <div>
                  <p
                    style={{
                      margin: "5px 0",
                      color: "#666",
                      fontSize: 13,
                      maxWidth: 700,
                    }}
                  >
                    {item.description}
                  </p>
                  <Text strong style={{ fontSize: 18, color: "#000" }}>
                    {formatCurrency(item.price)}
                  </Text>
                </div>
              }
            />
          </List.Item>
        )}
      />

      {/* Phần Tổng tiền Footer */}
      <div
        style={{
          marginTop: 30,
          paddingTop: 20,
          borderTop: "2px solid #f0f0f0",
        }}
      >
        <Row justify="end">
          <Col span={8} style={{ textAlign: "right" }}>
            <Row>
              <Col span={12}>
                <span className="default-typography" style={{ lineHeight: '40px' }}>
                  SubTotal
                </span>
              </Col>
              <Col span={12}>
                <span className="default-typography" style={{ lineHeight: '40px',fontWeight:400 }}>
                  {formatCurrency(subTotal)}
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <span className="default-typography" style={{ lineHeight: '40px' }}>
                  Tax
                </span>
              </Col>
              <Col span={12}>
                <span className="default-typography" style={{ lineHeight: '40px' ,fontWeight:400 }}>
                  {formatCurrency(tax)}
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <span className="default-typography" style={{ lineHeight: '40px' }}>
                  Total
                </span>
              </Col>
              <Col span={12}>
                <span className="default-typography" style={{ lineHeight: '40px' ,fontWeight:400 }}>
                  {formatCurrency(total)}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartPage;
