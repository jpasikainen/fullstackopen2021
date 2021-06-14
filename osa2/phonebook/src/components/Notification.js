import React from "react";

const Notification = (props) => {
  props = props.message;
  console.log(props);
  if (props.message === null || props.message === undefined) return null;
  if (typeof props.message !== String) {
    props.message = "User has already been removed from the database";
  }
  return (
    <div className={props.error ? "error" : "success"}>{props.message}</div>
  );
};

export default Notification;
