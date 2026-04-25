import React from "react";

function Seat({ label, isSelected, isBooked, onClick }) {
  let className = "seat";

  if (isBooked) className += " booked";
  else if (isSelected) className += " selected";

  return (
    <div className={className} onClick={onClick}>
      {label}
    </div>
  );
}

export default Seat;
