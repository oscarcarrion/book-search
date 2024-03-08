'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState({ error: false, msg: '' });
  const [loading, setLoading] = useState(false);
  const [hoveredBookIndex, setHoveredBookIndex] = useState(null);
  const searchBooks = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/search?query=${query}`,
      );
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError({ error: true, msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (error.error) {
    return (
      <div className="text-red-500">
        <p>Failed to fetch books: {error.msg}</p>
        <button
          onClick={() => {
            setBooks([]);
            setQuery('');
            setError({ error: false, msg: '' });
            setLoading(false);
          }}
          className="bg-blue-500 text-white p-2 mt-2 rounded-md"
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse rounded-full bg-blue-400 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-white pb-5">Book Search</h1>
      <div className="p-4 bg-gray-800 rounded-md">
        <form
          onSubmit={searchBooks}
          className="mb-4 flex flex-col md:flex-row items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 p-2 mr-2 rounded-md bg-gray-700 text-white"
            placeholder="Search for books"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 mt-2 md:mt-0 rounded-md"
          >
            Search
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, index) => (
            <div
              key={book.id}
              onMouseEnter={() => setHoveredBookIndex(index)}
              onMouseLeave={() => setHoveredBookIndex(null)}
              className={`mb-4 p-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 overflow-y-scroll max-h-[75vh] ${
                hoveredBookIndex !== null && hoveredBookIndex !== index
                  ? 'opacity-75 bg-gray-400'
                  : ''
              }`}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="h-96 w-96 object-cover rounded-md"
              />
              <h3 className="font-bold text-white py-2 text-lg">
                {book.title}
              </h3>
              <p className="text-gray-400 py-2">{book.authors.join(', ')}</p>
              <p className="text-white">{book.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
