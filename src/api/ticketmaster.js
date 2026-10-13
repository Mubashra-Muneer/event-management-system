const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export async function getEvents(keyword) {
  let url = BASE_URL + "/events.json?size=20&apikey=" + API_KEY;

  if (keyword !== "") {
    url = url + "&keyword=" + encodeURIComponent(keyword);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Request failed with status " + response.status);
  }

  const data = await response.json();

  if (!data._embedded) {
    return [];
  }

  return data._embedded.events;
}