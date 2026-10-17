import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById, clearSelectedEvent } from "../redux/eventsSlice.js";

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.events.selectedEvent);
  const detailsStatus = useSelector((state) => state.events.detailsStatus);
  const detailsError = useSelector((state) => state.events.detailsError);

  useEffect(() => {
    dispatch(fetchEventById(id));

    return () => {
      dispatch(clearSelectedEvent());
    };
  }, [dispatch, id]);

  if (detailsStatus === "loading") {
    return (
      <div className="page">
        <p className="message">Loading event details...</p>
      </div>
    );
  }

  if (detailsStatus === "failed") {
    return (
      <div className="page">
        <p className="error">Could not load event: {detailsError}</p>
        <Link to="/events">Back to events</Link>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="page">
        <p className="message">Event not found.</p>
        <Link to="/events">Back to events</Link>
      </div>
    );
  }

  let imageUrl = "";
  if (event.images && event.images.length > 0) {
    imageUrl = event.images[0].url;
  }

  let date = "Date not available";
  let time = "";
  if (event.dates && event.dates.start) {
    if (event.dates.start.localDate) {
      date = event.dates.start.localDate;
    }
    if (event.dates.start.localTime) {
      time = event.dates.start.localTime;
    }
  }

  let venueName = "Venue not available";
  let cityName = "";
  let countryName = "";
  let address = "";
  if (event._embedded && event._embedded.venues && event._embedded.venues.length > 0) {
    const venue = event._embedded.venues[0];
    if (venue.name) {
      venueName = venue.name;
    }
    if (venue.city && venue.city.name) {
      cityName = venue.city.name;
    }
    if (venue.country && venue.country.name) {
      countryName = venue.country.name;
    }
    if (venue.address && venue.address.line1) {
      address = venue.address.line1;
    }
  }

  let category = "Other";
  let genre = "";
  if (event.classifications && event.classifications.length > 0) {
    const classification = event.classifications[0];
    if (classification.segment && classification.segment.name) {
      category = classification.segment.name;
    }
    if (classification.genre && classification.genre.name) {
      genre = classification.genre.name;
    }
  }

  let priceInfo = "Price not available";
  if (event.priceRanges && event.priceRanges.length > 0) {
    const price = event.priceRanges[0];
    if (price.min !== undefined && price.max !== undefined) {
      priceInfo = price.currency + " " + price.min + " - " + price.max;
    }
  }

  let ticketUrl = "";
  if (event.url) {
    ticketUrl = event.url;
  }

  return (
    <div className="page">
      <Link to="/events" className="back-link">
        Back to events
      </Link>

      <div className="details-layout">
        {imageUrl !== "" && (
          <img className="details-image" src={imageUrl} alt={event.name} />
        )}

        <div className="details-info">
          <span className="event-category">{category}</span>
          <h2>{event.name}</h2>

          <p>
            <strong>Date:</strong> {date}
            {time !== "" && " at " + time}
          </p>
          <p>
            <strong>Venue:</strong> {venueName}
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {address !== "" && address + ", "}
            {cityName}
            {countryName !== "" && ", " + countryName}
          </p>
          {genre !== "" && (
            <p>
              <strong>Genre:</strong> {genre}
            </p>
          )}
          <p>
            <strong>Price:</strong> {priceInfo}
          </p>
          {event.info && (
            <p>
              <strong>Info:</strong> {event.info}
            </p>
          )}
          {ticketUrl !== "" && (
            <p>
              <a href={ticketUrl} target="_blank" rel="noreferrer">
                Official ticket page
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
