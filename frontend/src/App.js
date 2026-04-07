import React, { useState, useEffect } from "react";
import { movies, slots, seats } from "./data";
import "./App.css";

const API = "https://bookmyshow-backend-e8yy.onrender.com/api/booking";

function App() {
  const [movie, setMovie] = useState("");
  const [slot, setSlot] = useState("");
  const [seatData, setSeatData] = useState({});
  const [lastBooking, setLastBooking] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setLastBooking(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSeat = (type, value) => {
    setSeatData({ ...seatData, [type]: Number(value) });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie,
          slot,
          seats: seatData,
        }),
      });

      const data = await response.json();
      setLastBooking(data);
    } catch (error) {
      console.log("Booking error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Book that show!!</h2>

      <div className="movie-row">
        <h3>Select A Movie</h3>
        {movies.map((m) => (
          <div
            key={m}
            className={
              movie === m
                ? "movie-column movie-column-selected"
                : "movie-column"
            }
            onClick={() => setMovie(m)}
          >
            {m}
          </div>
        ))}
      </div>

      <div className="slot-row">
        <h3>Select a Time slot</h3>
        {slots.map((s) => (
          <div
            key={s}
            className={
              slot === s ? "slot-column slot-column-selected" : "slot-column"
            }
            onClick={() => setSlot(s)}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="seat-row">
        <h3>Select the seats</h3>

        {seats.map((s) => (
          <div key={s} className="seat-column">
            <h4>Type {s}</h4>
            <input
              type="number"
              min="0"
              onChange={(e) => handleSeat(s, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className="book-btn" onClick={handleSubmit}>
        Book Now
      </button>

      <div className="last-booking">
        <h3>Last Booking Details:</h3>

        {lastBooking?.message ? (
          <p>no previous booking found</p>
        ) : (
          lastBooking && (
            <div>
              <p>movie: {lastBooking.movie}</p>
              <p>slot: {lastBooking.slot}</p>

              {Object.entries(lastBooking.seats || {}).map(([k, v]) => (
                <p key={k}>
                  {k}: {v}
                </p>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
