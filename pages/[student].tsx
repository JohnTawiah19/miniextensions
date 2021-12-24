import React from "react";
import { useStore } from "react-redux";
import styles from "../styles/Home.module.css";

export default function Student() {
  const store = useStore();

  return <div className={styles.home}></div>;
}
