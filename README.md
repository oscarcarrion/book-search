# Book Search App

## Getting Started

To get the app up and running on your local machine, you'll need to start both the front-end and back-end servers. This involves navigating into each respective folder and running the corresponding commands. Here's how:

### Starting the Front-End (Next.js)

1. Open a terminal window.
2. Navigate to the front-end folder by running `cd book-search`.
3. Install the necessary dependencies by running `npm install`.
4. Start the Next.js server by running `npm run dev`.
5. The front-end server will now be running, and you can access the app in your browser at `http://localhost:3000`.

### Starting the Back-End (FastAPI)

1. Open another terminal window.
2. Navigate to the back-end folder by running `cd api`.
3. Install the necessary dependencies by running `pip install -r requirements.txt`.
4. Start the FastAPI server by running the command provided in the `api/Procfile`, which is `uvicorn application:app --host 0.0.0.0 --port 8000`. You can also try with `uvicorn application:app --reload`
5. The back-end server will now be running, and the API can be accessed at `http://localhost:8000`.

## Usage

Once both servers are up and running, you can use the app to search for books. The front-end provides a user-friendly interface for entering your search queries, and the back-end handles the requests and fetches the relevant book data.

Enjoy exploring a vast world of books with the Book Search App!
