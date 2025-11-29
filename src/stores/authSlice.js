import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Giả lập API Login (Async Thunk)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (userData.username === 'admin' && userData.password === '123456') {
        return { 
 
            name: 'MR. USER', 
            email: 'user@gmail.com', 
            avatar: '/images/avatar.png',
            dob: '2018-01-01', 
            gender: 'male',
            companyAddress: '15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi',
            homeAddress: '15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi'
        };
      } else {
        return rejectWithValue('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,         
    isLoading: false,     
    error: null,           
    isAuthenticated: false,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;