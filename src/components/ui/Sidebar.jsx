import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter'; // Ensure you have wouter installed for routing

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Function to handle clicks outside of the sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Effect to set up the click event listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white overflow-y-auto transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:block`}
      >
        <div className="p-4 font-bold text-lg border-b border-gray-700">Menu</div>
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <Link href="/todo" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Todo App</span>
            </Link>
          </li>
          <li>
            <Link href="/binary-converter" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Binary Converter</span>
            </Link>
          </li>
          <li>
            <Link href="/average-calculator" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Average Calculator</span>
            </Link>
          </li>
          <li>
            <Link href="/addition-table" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Addition Table</span>
            </Link>
          </li>
          <li>
            <Link href="/multiplication-table" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Multiplication Table</span>
            </Link>
          </li>
          <li>
            <Link href="/percentage-calculator" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Percentage Calculator</span>
            </Link>
          </li>
          <li>
            <Link href="/music-player" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Music Player</span>
            </Link>
          </li>
          <li>
            <Link href="/tic-tac-toe" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Tic Tac Toe</span>
            </Link>
          </li>
          <li>
            <Link href="/stopwatch" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Stopwatch</span>
            </Link>
          </li>
          <li>
            <Link href="/tic-tac-toe1" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Tic Tac Toe 1</span>
            </Link>
          </li>
          <li>
            <Link href="/timer" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Timer</span>
            </Link>
          </li>
          <li>
            <Link href="/currency-input" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Currency Input</span>
            </Link>
          </li>
          <li>
            <Link href="/stopwatch" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Stopwatch</span>
            </Link>
          </li>
          <li>
            <Link href="/tic-tac-toe1" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Tic Tac Toe 1</span>
            </Link>
          </li>
          <li>
            <Link href="/timer" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Timer</span>
            </Link>
          </li>
          <li>
            <Link href="/currency-input" onClick={() => setIsOpen(false)}>
              <span className="p-2 hover:bg-gray-700 rounded block">Currency Input</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Toggle Button for Mobile */}
      <button
        className="sm:hidden p-4 text-white bg-gray-800 fixed top-0 left-0 z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

     
    </div>
  );
};

export default Sidebar;
