import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserData {
    $id:string,
    name:string,
    created:Date,
    updated:Date
}

export interface AuthState {
    status: boolean;
    userData: UserData | null;
}

export interface StateInterface {
    auth: AuthState;
}

export interface RootState {
    auth: AuthState;
}
// const initialState  = <StateInterface> {
//     status:false,
//     userData:null
// }

export const initialState: StateInterface = {
    auth: {
        status: false,
        userData: null
    }
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action :  PayloadAction<{ userData: UserData }>) => {
         state.auth.status = true;
         state.auth.userData = action.payload.userData;
        },

        logout : (state) =>{
              state.auth.status = false;
              state.auth.userData = null;
        }
    }
})

export const {login , logout} = authSlice.actions;

export default authSlice.reducer