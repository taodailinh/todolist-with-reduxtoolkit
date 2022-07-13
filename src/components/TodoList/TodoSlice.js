// const initState = [
//   { id: 1, name: "Learn Java", completed: false, priority: "Low" },
//   { id: 2, name: "Learn Javascript", completed: true, priority: "Medium" },
// ];
// const todoListReducer = (state = initState, action) => {
//   switch (action.type) {
//     case "todoList/addTodo":
//       return [...state, action.payload];
//     case "todoList/toggleCompleteTodo":
//       return state.map((todo) => {
//         return todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo;
//       });
//     default:
//       return state;
//   }
// };
// export default todoListReducer;
import { createSlice } from "@reduxjs/toolkit";
// import { statusFilterChange } from "../../redux/actions";
export default createSlice({
  name: "todoList",
  initialState: [
    { id: 1, name: "Learn Java", completed: false, priority: "Low" },
    { id: 2, name: "Learn Javascript", completed: true, priority: "Medium" },
  ],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleCompleteTodo: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    },
  },
});
