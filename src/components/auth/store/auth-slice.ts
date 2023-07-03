import ThunkAPI from "../../../types/thunk-api";
import { AppState } from "../../../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import AuthService from "@/services/auth";
import GenericObject from "@/types/generic-object";

// Type for our state
export interface AuthState {
  checkingSignIn: null | 'checking' | 'checked'
  isError: boolean;
  signInError:string
  user: {
    userId:number
  }
}

// Initial state
const initialState: AuthState = {
    checkingSignIn: null,
    isError: false,
    signInError: "",
    user: {
      userId:-1
    }
};

export const signInCall = createAsyncThunk(
  'auth/signIn',
  async (signInInfo:{username:string, password:string}, thunkAPI:ThunkAPI) => {
    const authService:AuthService = new AuthService();
    const data = await authService.signIn(signInInfo);
    return data;
  }
)

export const signInCheckCall = createAsyncThunk(
  'auth/checksignIn',
  async (data: GenericObject, thunkAPI:ThunkAPI) => {
    const authService:AuthService = new AuthService();
    const res = await authService.checkSignIn(data);
    return res;
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
        ...action.payload.data.auth,
      };
    }).addCase(signInCall.pending,(state, action) => {
      return {
        ...state,
        checkingSignIn: "checking"
      }
    }).addCase(signInCall.fulfilled,(state, action:any) => {
      return {
        ...state,
        isError: false,
        checkingSignIn: "checked",
        user: {
          userId: action.payload.data.userId
        }
      }
    }).addCase(signInCall.rejected,(state, action:any) => {
      return {
        ...state,
        isError: true,
        signInError: action.payload.data.message,
        checkingSignIn: "checked",
      }
    }).addCase(signInCheckCall.pending,(state, action) => {
      return {
        ...state,
        user: {
          userId:-1
        },
        checkingSignIn: "checking"
      }
    }).addCase(signInCheckCall.fulfilled,(state, action:any) => {
      return {
        ...state,
        user: {
          userId: action.payload.data.userId
        },
        isError: false,
        checkingSignIn: "checked",
      }
    }).addCase(signInCheckCall.rejected,(state, action:any) => {
      return {
        ...state,
        isError: true,
        user: {
          userId:-1
        },
        signInError: action.error.message,
        checkingSignIn: "checked",
      }
    });
  },
});

//export const {  } = authSlice.actions;
export const selectCheckingSignedIn = (state: AppState) => state.auth.checkingSignIn;
export const selectIsError = (state: AppState) => state.auth.isError;
export const selectError = (state: AppState) => state.auth.signInError;
export const selectUser = (state: AppState) => state.auth.user;

export default authSlice.reducer;
