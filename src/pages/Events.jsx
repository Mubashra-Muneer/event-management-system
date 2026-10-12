import { useSelector } from "react-redux";

function Events() {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div className="page">
      <h2>Events</h2>
      {currentUser ? (
        <p>Welcome, {currentUser.name}. Events from Ticketmaster will appear here.</p>
      ) : (
        <p>You are browsing as a guest. Events from Ticketmaster will appear here.</p>
      )}
    </div>
  );
}

export default Events;