// import { createStore } from "redux";
// import rootReducer from "./reducer";
// import { composeWithDevTools } from "redux-devtools-extension";
// const composedEnhancer = composeWithDevTools();
// const store = createStore(rootReducer, composedEnhancer);
// export default store;
import filtersSlice from "../components/Filters/filtersSlice";
import todoListSlice from "../components/TodoList/todoSlice";

import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoListSlice.reducer,
  },
});
export default store;
