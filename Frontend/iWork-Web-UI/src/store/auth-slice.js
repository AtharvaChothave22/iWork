import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userName: "",
    userId: 0,
    roles: "",
    userImage: "",
  },
  reducers: {
    login(state, action) {
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.userName = action.payload.email;
      state.userImage = action.payload.image;
      state.roles = action.payload.role;
      if (localStorage.getItem("logicCredentials") === null) {
        persistLoginData(
          state.isLoggedIn,
          state.userId,
          state.userName,
          state.roles,
          state.userImage
        );
      }
    },
    setCurrentRole(state, action) {
      state.currentRole = action.payload.role;
      console.log(state.currentRole);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = "";
      state.roles = [];
      localStorage.clear();
    },
  },
});

function persistLoginData(isLoggedIn, userId, userName, roles, image) {
  const dataToPersist = {
    userId: userId,
    isLoggedIn: isLoggedIn,
    userName: userName,
    roles: roles,
    userImage: image,
  };
  localStorage.setItem("logicCredentials", JSON.stringify(dataToPersist));
}
export const authActions = authSlice.actions;
export default authSlice;
