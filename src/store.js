import { configureStore } from "@reduxjs/toolkit"
import colorReducer from "./redux/features/colorSlice"
export const store = configureStore({
  reducer : {
    templateColor : colorReducer
  }
});