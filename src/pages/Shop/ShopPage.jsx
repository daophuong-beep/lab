import { Input, Button, Card, Rate, List, Typography } from "antd";
import { PRODUCTS as DUMMY_PRODUCTS } from "../../mocks/product";
import { useNavigate } from "react-router-dom";
import "./ShopPage.css";
import ManualFilter from "./ManualFilter/ManualFilter";
import { useState } from "react";

const ShopPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate();

  // Hàm format tiền VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="default-typography">
      <div style={{ display: "flex", alignItems: "center", height: 60 }}>
        <p style={{ fontSize: 36 }}>Shop</p>
      </div>
      {/* search and filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "24px 0",
          borderBottom: "1px solid #ADADAD",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: "400" }}>Shop</div>
        <div style={{ display: "flex", gap: 19, alignItems: "end" }}>
          <Input
            className="search-input"
            placeholder="Search..."
            suffix={
              <div
                className="icon-wrapper"
                style={{ width: "25px", height: "25px" }}
              >
                <img src="/images/search-icon.png" alt="search" />
              </div>
            }
          />
          <div
            className="icon-wrapper"
            style={{ position: "relative",cursor: "pointer" }}
            onClick={() => setOpenFilter(!openFilter)}
          >
            <img
              style={{ width: "35px", height: "35px" }}
              src="/images/filter-icon.png"
              alt="search"
            />
           { openFilter && <ManualFilter isOpen={openFilter} onClose={() => setOpenFilter(false)} />}
          </div>
        </div>
      </div>

      {/* list product */}
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
        dataSource={DUMMY_PRODUCTS}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{ border: "none", display: "flex", cursor: "pointer" }}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    height: 226,
                    objectFit: "contain",
                    padding: "33px 25px 20px 0px",
                  }}
                />
                <div
                  className="card-typography"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <p>{item.name}</p>
                  <div style={{ marginTop: 20 }}>
                    <div
                      style={{
                        fontSize: 36,
                        lineHeight: "16px",
                        color: "#000000",
                        marginBottom: 20,
                      }}
                    >
                      {formatCurrency(item.price)}
                    </div>
                    <Rate
                      disabled
                      defaultValue={item.rating}
                      style={{ fontSize: 35 }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ShopPage;
