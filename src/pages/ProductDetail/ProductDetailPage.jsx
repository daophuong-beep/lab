import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, Typography, Rate, Button, Space, Card } from "antd";
import { ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/cartSlice";
import { PRODUCTS } from "../../mocks/product";

const { Title, Text, Paragraph } = Typography;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const fakeTypes = [
    {
      id: 1,
      color: "Xanh Dương",
    },
    {
      id: 2,
      color: "Đen",
    },
    {
      id: 3,
      color: "Trắng",
    },
  ];

  // Tìm sản phẩm dựa trên ID
  useEffect(() => {
    const foundProduct = PRODUCTS.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product)
    return <div style={{ padding: 20 }}>Không tìm thấy sản phẩm</div>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <div className="default-typography" style={{ margin: 20 }}>
        Shop
      </div>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="default-typography"
      >
        <Button
          type="text"
          onClick={() => navigate(-1)}
          className="default-typography"
          style={{ padding: 20 }}
        >
          Shop
        </Button>
        / Product
      </div>
      <Card>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={10}>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Image src={product.image} width="80%" />
            </div>
            <Space
              style={{ marginTop: 20, justifyContent: "center", width: "100%" }}
            >
              {fakeTypes.map((fakeType) => (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    key={fakeType.id}
                    style={{
                      border: "1px solid #ddd",
                      padding: 5,
                      cursor: "pointer",
                    }}
                  >
                    <img src={product.image} width={50} alt="thumb" />
                  </div>
                  <span>{fakeType.color}</span>
                </div>
              ))}
            </Space>
          </Col>

          <Col
            xs={24}
            md={14}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span className="default-typography" style={{ marginBottom: 29 }}>
              {product.name}
            </span>

            <p
              className="default-typography"
              style={{ fontWeight: "400", lineHeight: "40px" }}
            >
              {product.description}
            </p>

            <span className="default-typography" style={{ margin: "28px 0px 20px 0px",fontSize: 36 }}>
              {product.price.toLocaleString()} VND
            </span>

            <Rate
              disabled
              defaultValue={product.rating}
              style={{ marginBottom: 29, fontSize: 35 }}
            />

            <Space size="large" style={{ marginTop: 20 }}>
              <Button
                type="primary"
                size="large"
                style={{
                  width: 160,
                  height: 50,
                  backgroundColor: "#00C2FF",
                  fontWeight: "700",
                }}
              >
                Mua Ngay
              </Button>

              <Button
                type="primary"
                size="large"
                onClick={handleAddToCart}
                style={{
                  width: 200,
                  height: 50,
                  backgroundColor: "#00FF19",
                  fontWeight: "700",
                }}
              >
                Thêm vào giỏ hàng
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
