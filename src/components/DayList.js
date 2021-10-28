import React from "react";
import DayListItem from "components/DayListItem";
import "components/DayListItem.scss";

export default function DayList(props){
  const daylist = props.days.map(eachDay => (
    <DayListItem
      key={props.id}
      name={props.name}
      spots={props.spots}
      selected={props.name === props.value}
      setDay={props.onChange}
    />
  ));
  return(
    <ul>{daylist}</ul>
  )
}