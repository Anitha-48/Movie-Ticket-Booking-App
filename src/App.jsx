import React, { useState, useEffect } from "react";
import Seat from "./components/Seat";
import Popup from "./components/Popup";
import BookingList from "./components/BookingList";
import { movies } from "./data/movies";
import "./App.css";

const rows = 6;
const cols = 8;

function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ NEW STATES
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState("home");

  // ✅ Load from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bookedSeats")) || [];
      setBookedSeats(saved);
    } catch {
      setBookedSeats([]);
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
  }, [bookedSeats]);

  // ✅ Generate seat label
  const getSeatLabel = (index) => {
    const row = String.fromCharCode(65 + Math.floor(index / cols));
    const col = (index % cols) + 1;
    return row + col;
  };

  // ✅ Toggle seat
  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // ✅ Confirm booking (UPDATED)
  const confirmBooking = () => {
    const newBooking = {
      movie: selectedMovie.name,
      seats: selectedSeats,
      total: selectedSeats.length * selectedMovie.price,
      time: new Date().toLocaleString()
    };

    setBookings([...bookings, newBooking]);

    setBookedSeats([...new Set([...bookedSeats, ...selectedSeats])]);
    setSelectedSeats([]);
    setShowPopup(false);
  };

  // ✅ Total price
  const total = selectedSeats.length * (selectedMovie?.price || 0);

  // ✅ PAGE SWITCH
  if (page === "history") {
    return (
      <BookingList
        bookings={bookings}
        goBack={() => setPage("home")}
      />
    );
  }

  return (
    <div className="app">
      <h1>🎬 Movie Ticket Booking</h1>

      {/* 🎟️ View Booking Button */}
      <button onClick={() => setPage("history")}>
        View Bookings
      </button>

      {/* Movie Dropdown */}
      <select
        onChange={(e) =>
          setSelectedMovie(movies[e.target.selectedIndex])
        }
      >
        {movies.map((m, i) => (
          <option key={i}>
            {m.name} - ₹{m.price}
          </option>
        ))}
      </select>

      {/* Seats */}
      <div className="seats">
        {[...Array(rows * cols)].map((_, i) => {
          const label = getSeatLabel(i);

          return (
            <Seat
              key={i}
              label={label}
              isSelected={selectedSeats.includes(label)}
              isBooked={bookedSeats.includes(label)}
              onClick={() => toggleSeat(label)}
            />
          );
        })}
      </div>

      {/* Summary */}
      <p>Seats: {selectedSeats.join(", ")}</p>
      <p>Total: ₹{total}</p>

      {/* Book Button */}
      <button
        className="book-btn"
        onClick={() => {
          if (selectedSeats.length === 0) {
            alert("Please select seats first");
            return;
          }
          setShowPopup(true);
        }}
      >
        Book Now
      </button>

      {/* Popup */}
      {showPopup && (
        <Popup
          seats={selectedSeats}
          total={total}
          onConfirm={confirmBooking}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default App;
