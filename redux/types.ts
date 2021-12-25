type SET_STUDENTS = "SET_STUDENTS";

interface IStudents {
  payload: {
    name: string;
    students: string[];
  };
}

export interface ISetCourse {
  type: SET_STUDENTS;
  payload: IStudents;
}
