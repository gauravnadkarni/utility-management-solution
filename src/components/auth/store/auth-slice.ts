import ThunkAPI from "../../../types/thunk-api";
import { AppState } from "../../../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import AuthService from "@/services/auth";

// Type for our state
export interface AuthState {
  checkingSignIn: boolean
  isSignedIn: boolean;
  isError: boolean;
  signInError:string
}

// Initial state
const initialState: AuthState = {
    checkingSignIn: false,
    isSignedIn: false,
    isError: false,
    signInError: ""
};

const signInCall = createAsyncThunk(
  'auth/signIn',
  async (signInInfo:{username:string, password:string}, thunkAPI:ThunkAPI) => {
    const authService:AuthService = new AuthService();
    const data = await authService.signIn(signInInfo);
    return data.data;
  }
)

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
  },
  extraReducers:(builder) => {
    builder.addCase(HYDRATE, (state, action:any) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    }).addCase(signInCall.pending,(state, action) => {
      return {
        ...state,
        checkingSignIn: true
      }
    }).addCase(signInCall.fulfilled,(state, action) => {
      return {
        ...state,
        isSignedIn: true,
        isError: false,
        checkingSignIn: false,
      }
    }).addCase(signInCall.rejected,(state, action:any) => {
      return {
        ...state,
        isSignedIn: false,
        isError: true,
        signInError: action.payload.message,
        checkingSignIn: false,
      }
    });
  },
});

//export const {  } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.isSignedIn;
export const selectIfSignedIn = (state: AppState) => state.auth.checkingSignIn;
export const selectIsError = (state: AppState) => state.auth.isError;
export const selectError = (state: AppState) => state.auth.signInError;

export const signIn = signInCall;

export default authSlice.reducer;
