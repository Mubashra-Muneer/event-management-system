function EventCard({ event }) {
  let imageUrl = "";
  if (event.images && event.images.length > 0) {
    imageUrl = event.images[0].url;
  }

  let venueName = "Venue not available";
  let cityName = "";
  if (event._embedded && event._embedded.venues && event._embedded.venues.length > 0) {
    const venue = event._embedded.venues[0];
    venueName = venue.name;
    if (venue.city) {
      cityName = venue.city.name;
    }
  }

  let category = "Other";
  if (event.classifications && event.classifications.length > 0) {
    if (event.classifications[0].segment) {
      category = event.classifications[0].segment.name;
    }
  }

  let date = "Date not available";
  if (event.dates && event.dates.start && event.dates.start.localDate) {
    date = event.dates.start.localDate;
  }

  return (
    <div className="event-card">
      {imageUrl !== "" && (
        <img className="event-image" src={imageUrl} alt={event.name} />
      )}
      <div className="event-info">
        <span className="event-category">{category}</span>
        <h3>{event.name}</h3>
        <p>{date}</p>
        <p>
          {venueName}
          {cityName !== "" && ", " + cityName}
        </p>
      </div>
    </div>
  );
}

export default EventCard;