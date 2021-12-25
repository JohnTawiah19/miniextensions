import { ActionCreator } from "redux";
import { ISetCourse } from ".";

export const setStudents: ActionCreator<ISetCourse> = (payload) => {
  return {
    payload,
    type: "SET_STUDENTS",
  };
};
