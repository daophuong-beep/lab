import React from 'react';
import './ManualFilter.css';

const ManualFilter = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="filter-invisible-backdrop" onClick={onClose}></div>

      <div className="filter-dropdown-box">
        
        <div className="filter-header">Filter</div>

        <div className="filter-section">
          <div className="filter-section-title">Giá</div>
          
          <div className="filter-row">
            <span className="filter-label">Từ:</span>
            <div className="filter-value-box">
              <span className="filter-value-text">0 VNĐ</span>
              <img src="/images/arrow-down.png" alt="v" className="arrow-icon" />
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">Đến:</span>
            <div className="filter-value-box">
              <span className="filter-value-text">10 000 000 VNĐ</span>
              <img src="/images/arrow-down.png" alt="v" className="arrow-icon" />
            </div>
          </div>
        </div>

        <div className="filter-section" style={{ marginTop: 20 }}>
          <div className="filter-section-title">Đánh giá</div>

          <div className="filter-row">
            <span className="filter-label">Từ:</span>
            <div className="filter-value-box">
              <span className="filter-value-text">0 Sao</span>
              <img src="/images/arrow-down.png" alt="v" className="arrow-icon" />
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">Đến:</span>
            <div className="filter-value-box">
              <span className="filter-value-text">5 Sao</span>
              <img src="/images/arrow-down.png" alt="v" className="arrow-icon" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ManualFilter;