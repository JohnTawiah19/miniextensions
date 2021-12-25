import React from "react";
import { useStore } from "react-redux";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { AppState } from "../redux";
import { StudentCard } from "../components/StudentCard";

export default function Student() {
  const [students, setStudents] = React.useState<AppState>();
  const store = useStore<AppState>();
  React.useEffect(() => {
    const state = store.getState();
    setStudents(state);
  }, [store]);
  console.log(students);
  return (
    <div className={styles.home}>
      <Link passHref href="/">
        <button className={styles.logout_btn}>logout</button>
      </Link>
      <div className={styles.card_list}>
        <div>{!students && <p>loading...</p>}</div>
        {students && students.length > 0 ? (
          students.map((student) => (
            <StudentCard
              name={student.name}
              key={student.name}
              students={student.students}
            />
          ))
        ) : (
          <p>No student was matched with that input</p>
        )}
      </div>
    </div>
  );
}
