import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/eventsSlice.js";
import EventCard from "../components/EventCard.jsx";

const categories = ["Music", "Sports", "Arts & Theatre", "Film", "Miscellaneous"];

function Events() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  // Sends every current filter together so one filter does not erase the others.
  function loadEvents(nextKeyword, nextCategory, nextCity, nextDays) {
    dispatch(
      fetchEvents({
        keyword: nextKeyword,
        category: nextCategory,
        city: nextCity,
        days: nextDays,
      })
    );
  }

  useEffect(() => {
    dispatch(
      fetchEvents({
        keyword: "",
        category: "",
        city: "",
        days: "",
      })
    );
  }, [dispatch]);

  function handleSearch(event) {
    event.preventDefault();
    loadEvents(keyword.trim(), category, city.trim(), days);
  }

  function handleCategoryClick(selectedCategory) {
    setCategory(selectedCategory);
    loadEvents(keyword.trim(), selectedCategory, city.trim(), days);
  }

  function handleDaysChange(event) {
    const selectedDays = event.target.value;
    setDays(selectedDays);
    loadEvents(keyword.trim(), category, city.trim(), selectedDays);
  }

  function handleClear() {
    setKeyword("");
    setCategory("");
    setCity("");
    setDays("");
    loadEvents("", "", "", "");
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
        <input
          type="text"
          placeholder="City (e.g. London)"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <select value={days} onChange={handleDaysChange}>
          <option value="">Any time</option>
          <option value="7">Next 7 days</option>
          <option value="30">Next 30 days</option>
          <option value="90">Next 90 days</option>
        </select>
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      <div className="category-chips">
        <button
          type="button"
          className={category === "" ? "chip chip-active" : "chip"}
          onClick={() => handleCategoryClick("")}
        >
          All
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? "chip chip-active" : "chip"}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

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