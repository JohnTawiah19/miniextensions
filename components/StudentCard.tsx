import React from "react";
import styles from "../styles/Home.module.css";

interface StudentCardProps {
  course: string;
  students: string[];
}
export function StudentCard({ course, students }: StudentCardProps) {
  return (
    <div className={styles.card}>
      <p>Name</p>
      <p>{course}</p>
      <p>Students</p>
      <p>
        {students.map((student, index) => (
          <p key={`${student}_ ${index}`}>{student}</p>
        ))}
      </p>
    </div>
  );
}
