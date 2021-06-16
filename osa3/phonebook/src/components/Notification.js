import React from "react";

const Notification = (props) => {
  props = props.message;
  //console.log(props);
  if (props.message === null || props.message === undefined) return null;

  if (props.message.name === "Error") {
    props.message = props.message.response.data.error;
  }
  return (
    <div className={props.error ? "error" : "success"}>{props.message}</div>
  );
};

export default Notification;
