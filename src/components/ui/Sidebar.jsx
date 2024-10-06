import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter'; // Ensure you have wouter installed for routing

const SidebarData = [
  { id: 1, name: 'Todo App', link: '/todo' },
  { id: 2, name: 'Binary Converter', link: '/binary-converter' },
  { id: 3, name: 'Average Calculator', link: '/average-calculator' },
  { id: 4, name: 'Addition Table', link: '/addition-table' },
  { id: 5, name: 'Multiplication Table', link: '/multiplication-table' },
  { id: 6, name: 'Percentage Calculator', link: '/percentage-calculator' },
  { id: 7, name: 'Music Player', link: '/music-player' },
  { id: 8, name: 'Tic Tac Toe', link: '/tic-tac-toe' },
  { id: 9, name: 'Stopwatch', link: '/stopwatch' },
  { id: 10, name: 'Tic Tac Toe 1', link: '/tic-tac-toe1' },
  { id: 11, name: 'Timer', link: '/timer' },
  { id: 12, name: 'Currency Input', link: '/currency-input' },
  { id: 13, name: 'RGB Color Picker', link: '/rgb-color-picker' },
  { id: 14, name: 'CMYK Color Picker', link: '/cmyk-color-picker' },
  {id: 15, name: "RedirectCodeGenerator", link: "/redirect-code-generator"},
];

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
        className={`fixed top-0 left-0 h-full w-64 bg-purple-800 text-white overflow-y-auto transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:block`}
      >
        <div className="p-4 font-bold text-lg border-b border-gray-700">Menu</div>
        <ul className="flex flex-col space-y-2 p-4">
          {SidebarData.map((item) => (
            <li key={item.id}>
              <Link href={item.link} onClick={() => setIsOpen(false)}>
                <span className="p-2 hover:bg-gray-700 rounded block">{item.name}</span>
              </Link>
            </li>
          ))}
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