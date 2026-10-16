const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

function checkApiKey() {
  if (!API_KEY) {
    throw new Error("API key is missing. Check your .env file and restart npm run dev.");
  }
}

function formatDate(date) {
  return date.toISOString().split(".")[0] + "Z";
}

export async function getEvents(filters) {
  checkApiKey();

  let url = BASE_URL + "/events.json?size=20&sort=date,asc&apikey=" + API_KEY;

  if (filters.keyword) {
    url = url + "&keyword=" + encodeURIComponent(filters.keyword);
  }

  if (filters.category) {
    url = url + "&classificationName=" + encodeURIComponent(filters.category);
  }

  if (filters.city) {
    url = url + "&city=" + encodeURIComponent(filters.city);
  }

  if (filters.days) {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + Number(filters.days));
    url = url + "&startDateTime=" + formatDate(start);
    url = url + "&endDateTime=" + formatDate(end);
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