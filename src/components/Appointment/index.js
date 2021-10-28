import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { id, time, interview } = props;
  return (
    <article className="appointment">
      {props.time}
    </article>
  );
}