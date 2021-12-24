import { createStore } from "redux";
import AppReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
export const app = [
  {
    id: "",
    name: "",
    students: [""],
  },
];

export const store = createStore(AppReducer, composeWithDevTools());

export type AppState = typeof app;
export default store;
