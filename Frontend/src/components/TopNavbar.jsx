"use client";

import {useState} from "react";

export default function TopNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    // Redirect to search page
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed top-0 left-0 right-0 border-b bg-white rounded-md border-gray-200 p-3 z-10 w-full  flex items-center justify-center">
      <input
        type="text"
        name="query"
        placeholder={isExpanded ? "Search..." : ""}
        className={`w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out ${
          isExpanded ? "pr-10" : "pr-4 w-10"
        }`}
        onClick={handleClick}
      />
      <button
        type="submit"
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-transparent border-none">
        <span className="sr-only">Search</span>
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}
