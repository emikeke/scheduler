import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";


export default function Appointment(props) {
  const { id, time, interview } = props;
  return (
    <article className="appointment">
      <Header key={id} time={time} />
      {props.interview ? (<Show student={interview.student} interviewer={interview.interviewer} />) : (<Empty />)}
    </article>
  );
}