import React from "react";

export default function Die(props) {
  return (
    <div
      style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
      className="die-face"
      onClick={props.getDiceId}
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
