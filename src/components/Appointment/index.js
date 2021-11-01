import React, {useEffect} from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [mode, transition, props.interview])

  function save(name, interviewer) {
    if (name && interviewer) {
      transition(SAVING);
    }
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
    }

  function remove() {
    if (mode === CONFIRM) {
      transition(DELETING);
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
    } else {
      transition(CONFIRM);
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() =>transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
 				<Form
          name={props.name}
          value={props.value}
 					interviewers={props.interviewers}
          onSave={save}
 					onCancel={back}
 				/>
 			)}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={remove}
          message="Confirm you want to delete the appointment?"
        />
      )}
    </article>
  );
}