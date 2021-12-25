import React from "react";
import styles from "../styles/Home.module.css";

interface StudentCardProps {
  name: string;
  students: string[];
}
export function StudentCard({ name, students }: StudentCardProps) {
  return (
    <div className={styles.card}>
      <strong>
        <p>Name</p>
      </strong>
      <p>{name}</p>
      <strong>
        <p>Students</p>
      </strong>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {students.map((student, index) => (
          <p key={`${student}_ ${index}`}>{student},&nbsp; </p>
        ))}
      </div>
    </div>
  );
}

StudentCard.defaultProps = {
  data: {
    name: "test1",
    students: ["test1", "test2", "test3"],
  },
};
