from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/search")
async def search_books(query: str):
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}"
    response = requests.get(url)
    data = response.json()
    books = [
        {
            "id": item["id"],
            "title": item["volumeInfo"].get("title", "No title"),
            "authors": item["volumeInfo"].get("authors", []),
            "description": item["volumeInfo"].get("description", "No description"),
            "cover": (
                item["volumeInfo"]["imageLinks"]["thumbnail"]
                if "imageLinks" in item["volumeInfo"]
                else ""
            ),
        }
        for item in data.get("items", [])
    ]
    return {"books": books}
