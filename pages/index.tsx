import type { NextPage } from "next";
import React from "react";
import { useStore } from "react-redux";
import { AppState, setCourse } from "../redux";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [inputData, setInputData] = React.useState<string>("");
  const [courseId, setCourseId] = React.useState<string[]>([""]);
  const store = useStore<AppState>();

  const courseState = (courses: any[]) => {
    return courses.map((course) => ({
      id: course.id,
      name: course.fields.Name,
      students: [],
    }));
  };

  const getCourseData = async (param: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/getClass", {
        method: "POST",
        body: JSON.stringify(param),
      });
      const data = await response.json();

      const courses = courseState(data);
      store.dispatch(setCourse(courses));

      let course = store.getState();
      const courseIds = course.map((course) => course.id);
      getStudentsData(courseIds);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const getStudentsData = async (param: string[]) => {
    try {
      const students = param.map(async (input) => {
        const response = await fetch("http://localhost:3000/api/getStudents", {
          method: "POST",
          body: JSON.stringify(input),
        });
        const data = await response.json();
        console.log(data);
      });
      console.log(students);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.form}>
        <label> Student Name: </label>
        <input type="text" onChange={(e) => setInputData(e.target.value)} />
      </div>
      <button onClick={() => getCourseData(inputData)} className={styles.btn}>
        Login
      </button>
    </div>
  );
};

export default Home;
