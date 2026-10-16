import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/eventsSlice.js";
import EventCard from "../components/EventCard.jsx";

function Events() {
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(fetchEvents({ keyword: "" }));
  }, [dispatch]);

  function handleSearch(event) {
    event.preventDefault();
    dispatch(fetchEvents({ keyword: keyword.trim() }));
  }

  function handleClear() {
    setKeyword("");
    dispatch(fetchEvents({ keyword: "" }));
  }

  return (
    <div className="page">
      <h2>Events</h2>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events (e.g. concert, football)"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {status === "loading" && <p className="message">Loading events...</p>}

      {status === "failed" && (
        <p className="error">Could not load events: {error}</p>
      )}

      {status === "succeeded" && events.length === 0 && (
        <p className="message">No events found.</p>
      )}

      <div className="events-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;