import { configureStore } from "@reduxjs/toolkit";
import myDataReducer from "./features/myDataSlice.js"
import homePageReducer from "./features/homePageSlice.js"

export default configureStore({
  reducer: {
    myData: myDataReducer,
    homePageData: homePageReducer
  }
})