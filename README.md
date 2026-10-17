# Event Management System

A beginner-friendly React app for exploring Ticketmaster events, registering for events, and managing your own event list.

## Technologies
- React (Vite)
- Redux Toolkit
- React Router
- Ticketmaster Discovery API
- Local Storage for auth and registrations

## Features
- Register, login and logout (saved in Local Storage)
- Browse events from the Ticketmaster API
- Search by keyword
- Filter by category, city and upcoming days
- View event details (date, venue, location, category, image and more)
- Register for events when logged in (duplicates blocked)
- Cancel registrations
- My Events page with upcoming and completed sections
- Protected route for My Events
- Loading and error states
- Form validation on login and register
- Responsive layout

## Setup
1. Clone this repository
2. Open the project folder in a terminal
3. Run `npm install`
4. Get a Ticketmaster API key (Consumer Key) from https://developer.ticketmaster.com/
5. Create a file named `.env` in the project root
6. Copy the line from `.env.example` into `.env` and replace `your_api_key_here` with your real key
7. Run `npm run dev`
8. Open the local address shown in the terminal (usually http://localhost:5173)

## Important
- Never commit your `.env` file
- The `.env` file is already listed in `.gitignore`
- Restart `npm run dev` after you create or change `.env`

## Example .env
```
VITE_TICKETMASTER_API_KEY=your_api_key_here
```
