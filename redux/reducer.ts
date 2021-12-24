import { Reducer } from "redux";
import { AppState, app } from "./store";
const AppReducer: Reducer<AppState> = (state: AppState = app, action) => {
  if (action.type === "SET_COURSE") {
    state = action.payload;
    return state;
  }
  return state;
};

export default AppReducer;
