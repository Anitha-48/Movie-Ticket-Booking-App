import React from "react";

function Popup({ seats, total, onConfirm, onCancel }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Confirm Booking</h2>
        <p>Seats: {seats.join(", ")}</p>
        <p>Total: ₹{total}</p>

        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default Popup;
