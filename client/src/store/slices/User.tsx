import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/users";

export interface IUser {
  userName: string
  firstName: string
  lastName: string
}

export interface IUserSlice {
  userList: User[],
  selectedUser: User
}

const initialState: IUserSlice = {
  userList: [],
  selectedUser: {
    id: 0,
    userName: "",
    firstName: "",
    lastName: ""
  }
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload.users;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload.user;
    }
  }
})

export const { setUserList, setSelectedUser } = UserSlice.actions;
export default UserSlice.reducer;