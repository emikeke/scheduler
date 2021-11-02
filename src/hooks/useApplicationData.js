import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  })

  function setDay(day) {
    setState({...state, day});
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayOfWeek = findDay(state.day)
  let day = {
    ...state.days[dayOfWeek],
    spots: state.days[dayOfWeek]
    }

  if (!state.appointments[id].interview) {
    day = {
    ...state.days[dayOfWeek],
    spots: state.days[dayOfWeek].spots - 1
    } 
  } else {
    day = {
    ...state.days[dayOfWeek],
    spots: state.days[dayOfWeek].spots
    } 
  }
  let days = state.days
    days[dayOfWeek] = day;
    return axios
      .put(`/api/appointments/${id}`, {interview})
      .then(response => {
        setState({...state, appointments, days});
    });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayOfWeek = findDay(state.day)

     const day = {
       ...state.days[dayOfWeek],
       spots: state.days[dayOfWeek].spots + 1
     }

     let days = state.days
     days[dayOfWeek] = day;
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({...state, appointments, days})
    })
  }

   function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
   };
}