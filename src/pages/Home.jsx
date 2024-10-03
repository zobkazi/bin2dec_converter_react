import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Online Calculators & Tools</h1>
      <p className="text-gray-600 text-lg mb-6 text-center">
        Explore a variety of calculators and tools to simplify your calculations and enhance your productivity.
      </p>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Math Calculators</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <Link to="/scientific" className="text-blue-600 hover:underline" target="_blank">
              Scientific Calculator
            </Link>
          </li>
          <li>
            <Link to="/percentage" className="text-blue-600 hover:underline" target="_blank">
              Percentage Calculator
            </Link>
          </li>
          <li>
            <Link to="/fraction" className="text-blue-600 hover:underline" target="_blank">
              Fraction Calculator
            </Link>
          </li>
          <li>
            <Link to="/average" className="text-blue-600 hover:underline" target="_blank">
              Average Calculator
            </Link>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Miscellaneous Calculators</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <Link to="/grade" className="text-blue-600 hover:underline" target="_blank">
              Grade Calculator
            </Link>
          </li>
          <li>
            <Link to="/gpa" className="text-blue-600 hover:underline" target="_blank">
              GPA Calculator
            </Link>
          </li>
          <li>
            <Link to="/final-grade" className="text-blue-600 hover:underline" target="_blank">
              Final Grade Calculator
            </Link>
          </li>
          <li>
            <Link to="/mortgage" className="text-blue-600 hover:underline" target="_blank">
              Mortgage Calculator
            </Link>
          </li>
          <li>
            <Link to="/compound-interest" className="text-blue-600 hover:underline" target="_blank">
              Compound Interest Calculator
            </Link>
          </li>
          <li>
            <Link to="/bmi" className="text-blue-600 hover:underline" target="_blank">
              BMI Calculator
            </Link>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Tools</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <Link to="/notepad" className="text-blue-600 hover:underline" target="_blank">
              Online Notepad
            </Link>
          </li>
          <li>
            <Link to="/rgb" className="text-blue-600 hover:underline" target="_blank">
              RGB Color Codes
            </Link>
          </li>
          <li>
            <Link to="/ascii" className="text-blue-600 hover:underline" target="_blank">
              ASCII Table
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
