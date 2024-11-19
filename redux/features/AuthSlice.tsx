import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthenticatedUser {
  uid: string; 
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Define the shape of the authentication state
interface AuthState {
  isAuthenticated: boolean;
  user: AuthenticatedUser | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Handle login
    login(state, action: PayloadAction<AuthenticatedUser>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // Handle logout
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
