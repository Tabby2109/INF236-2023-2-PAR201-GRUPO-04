import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/user";

export default configureStore<AppStore>({
    reducer: {
        user: userSlice.reducer
    }
});