import { useSelector, useDispatch } from "react-redux";
import { cancelRegistration } from "../redux/registrationsSlice.js";
import RegisteredEventCard from "../components/RegisteredEventCard.jsx";

function MyEvents() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const registrations = useSelector((state) => state.registrations.items);

  const myRegistrations = registrations.filter(
    (item) => item.userEmail === currentUser.email
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [];
  const completed = [];

  myRegistrations.forEach((item) => {
    if (!item.date || item.date === "Date not available") {
      upcoming.push(item);
      return;
    }

    const eventDate = new Date(item.date);

    if (eventDate >= today) {
      upcoming.push(item);
    } else {
      completed.push(item);
    }
  });

  function handleCancel(eventId) {
    dispatch(
      cancelRegistration({
        userEmail: currentUser.email,
        eventId: eventId,
      })
    );
  }

  return (
    <div className="page">
      <h2>My Events</h2>

      {myRegistrations.length === 0 && (
        <p className="message">You have not registered for any events yet.</p>
      )}

      <h3>Upcoming</h3>
      {upcoming.length === 0 && (
        <p className="message">No upcoming registered events.</p>
      )}
      <div className="events-grid">
        {upcoming.map((item) => (
          <RegisteredEventCard
            key={item.eventId}
            registration={item}
            canCancel={true}
            onCancel={() => handleCancel(item.eventId)}
          />
        ))}
      </div>

      <h3 className="section-title">Completed</h3>
      {completed.length === 0 && (
        <p className="message">No completed registered events.</p>
      )}
      <div className="events-grid">
        {completed.map((item) => (
          <RegisteredEventCard
            key={item.eventId}
            registration={item}
            canCancel={false}
            onCancel={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default MyEvents;
