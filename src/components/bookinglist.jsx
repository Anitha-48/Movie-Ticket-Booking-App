import React from "react";

function BookingList({ bookings, goBack }) {
  return (
    <div className="booking-page">
      <h1>🎟️ Booking History</h1>

      {bookings.length === 0 ? (
        <p className="empty">No bookings yet</p>
      ) : (
        <div className="ticket-container">
          {bookings.map((b, i) => (
            <div key={i} className="ticket-card">
              <div className="ticket-header">
                <h3>{b.movie}</h3>
                <span className="ticket-time">{b.time}</span>
              </div>

              <div className="ticket-body">
                <p><strong>Seats:</strong> {b.seats.join(", ")}</p>
                <p><strong>Total:</strong> ₹{b.total}</p>
              </div>

              <div className="ticket-footer">
                🎬 Enjoy your movie!
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="back-btn" onClick={goBack}>
        ⬅ Back to Booking
      </button>
    </div>
  );
}

export default BookingList;
