import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';
// import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Các trang cần Layout chung */}
        {/* <Route path="/" element={<MainLayout />}>
           <Route index element={<Shop />} />
           <Route path="shop" element={<Shop />} />
           <Route path="cart" element={<Cart />} />
           <Route path="profile" element={<Profile />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;