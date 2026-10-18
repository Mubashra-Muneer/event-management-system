function RegisteredEventCard({ registration, onCancel, canCancel }) {
  return (
    <div className="event-card">
      {registration.image !== "" && (
        <img
          className="event-image"
          src={registration.image}
          alt={registration.name}
        />
      )}
      <div className="event-info">
        <h3>{registration.name}</h3>
        <p>{registration.date}</p>
        <p>
          {registration.venue}
          {registration.city !== "" && ", " + registration.city}
        </p>
        {canCancel && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel registration
          </button>
        )}
      </div>
    </div>
  );
}

export default RegisteredEventCard;
