import React from "react";
import DayListItem from "components/DayListItem";
import "components/DayListItem.scss"

export default function DayList(props){
  const daylist = props.days.map(eachDay => (
    <DayListItem
      key={eachDay.id}
      name={eachDay.name}
      spots={eachDay.spots}
      selected={eachDay.name === props.day}
      setDay={props.setDay}
    />
  ));
  return(
    <ul>{daylist}</ul>
  )
}