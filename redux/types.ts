type SET_COURSE = "SET_COURSE";

interface ICourse {
  payload: {
    id: string;
    name: string;
  };
}

export interface ISetCourse {
  type: SET_COURSE;
  payload: ICourse;
}
