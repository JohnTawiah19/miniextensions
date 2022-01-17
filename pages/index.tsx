import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useStore } from "react-redux";
import { AppState, setStudents } from "../redux";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [inputData, setInputData] = React.useState<string>("");
  const store = useStore<AppState>();
  const router = useRouter();

  const getCourseData = async (param: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/getClass", {
        method: "POST",
        body: JSON.stringify(param),
      });
      const data = await response.json();
      console.log(data);
      store.dispatch(setStudents(data));
      router.push("/student");
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.form}>
        <label> Student Name:&nbsp; </label>
        <input type="text" onChange={(e) => setInputData(e.target.value)} />
      </div>
      <button onClick={() => getCourseData(inputData)} className={styles.btn}>
        Login
      </button>
    </div>
  );
};

export default Home;
