import { Link, Outlet } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 text-white w-64 h-full fixed right-0 top-0 flex flex-col p-4 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Math Calculators</h2>
            <ul className="space-y-2">
                <li>
                    <Link to="/scientific" className="hover:text-gray-300">Scientific Calculator</Link>
                </li>
                <li>
                    <Link to="/simple" className="hover:text-gray-300">Simple Calculator</Link>
                </li>
                <li>
                    <Link to="/average" className="hover:text-gray-300">Average Calculator</Link>
                </li>
                <li>
                    <Link to="/base" className="hover:text-gray-300">Base Calculator</Link>
                </li>
                <li>
                    <Link to="/complex" className="hover:text-gray-300">Complex Numbers Calculator</Link>
                </li>
                <li>
                    <Link to="/fractions" className="hover:text-gray-300">Fractions Calculator</Link>
                </li>
                <li>
                    <Link to="/percentage" className="hover:text-gray-300">Percentage Calculator</Link>
                </li>
            </ul>

            <Outlet />
        </nav>
    );
};

export default NavBar;
