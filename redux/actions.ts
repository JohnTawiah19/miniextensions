import { ActionCreator } from "redux";
import { ISetCourse } from ".";

export const setCourse: ActionCreator<ISetCourse> = (payload) => {
  return {
    payload,
    type: "SET_COURSE",
  };
};
