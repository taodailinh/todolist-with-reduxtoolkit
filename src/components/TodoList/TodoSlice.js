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
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { statusFilterChange } from "../../redux/actions";
const todosSlice = createSlice({
  name: "todoList",
  initialState: { status: "idle", todos: [] },
  // [
  //   { id: 1, name: "Learn Java", completed: false, priority: "Low" },
  //   { id: 2, name: "Learn Javascript", completed: true, priority: "Medium" },
  // ],
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = "idle";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        // let currentTodo = state.todos.find(
        //   (todo) => todo.id === action.payload.id
        // );
        state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.completed = !todo.completed;
          }
        });
      });
  },
});
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("/api/todos");
  console.log({ res });
  const data = await res.json();
  console.log(data);
  return data.todos;
});

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (newTodo) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();
    console.log(data);
    return data.todos;
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (updatedTodo) => {
    const res = await fetch("/api/updateTodo", {
      method: "POST",
      body: JSON.stringify(updatedTodo),
    });
    const data = await res.json();
    return data.todos;
  }
);

export default todosSlice;

// Thunk function - thunk action - middleware - (Test)
// export function addTodos(todo) {
//   return function addTodosThunk(dispatch, getState) {
//     console.log("[addTodosThunk]", getState());
//     console.log(todo);
//     todo.name = "Linh";
//     dispatch(todosSlice.actions.addTodo(todo));
//   };
// }
