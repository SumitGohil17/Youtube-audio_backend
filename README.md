# Youtube Audio Backend

This repository contains the backend service for converting YouTube videos into audio files. It is built using Node.js and provides an API for handling conversion requests.


## Prerequisites

- Node.js and npm installed on your machine.
- A RapidAPI account to access the YouTube conversion API.

## Getting Started

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/SumitGohil17/Youtube-audio_backend.git
   cd Youtube-audio_backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add your RapidAPI key:

   ```plaintext
   API_KEY=your_rapidapi_key_here
   HOST_KEY = your_rapidapi_host_key_here
   KEY_URL = Request_URL_here
   ```

   Replace `your_rapidapi_key_here` with your actual RapidAPI key.

4. **Start the Server:**

   ```bash
   node server.js
   ```

   The server will start on the default port 5000. You can change this in the `server.js` file if needed.

### API Reference

This project uses an API from RapidAPI to handle the conversion of YouTube videos to audio. Ensure you have signed up on RapidAPI and obtained an API key.

- **Endpoint:** `/api/data`
- **Method:** `GET`
- **Query Parameter:** `URL` - The YouTube video URL to convert.

Example request:
```
GET http://localhost:5000/api/data?URL=https://www.youtube.com/watch?v=example
```
