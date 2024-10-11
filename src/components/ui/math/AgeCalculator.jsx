import { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const AgeCalculator = () => {
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [ageDetails, setAgeDetails] = useState(null);
  const today = dayjs();

  const years = Array.from({ length: 100 }, (_, i) => today.year() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleCalculate = () => {
    if (!birthDay || !birthMonth || !birthYear) return;

    const birthDate = dayjs(`${birthYear}-${birthMonth}-${birthDay}`);
    const ageInYears = today.diff(birthDate, 'year');
    const ageInMonths = today.diff(birthDate, 'month');
    const ageInDays = today.diff(birthDate, 'day');
    const weeks = Math.floor(ageInDays / 7);

    const nextBirthday = dayjs(`${today.year()}-${birthMonth}-${birthDay}`);
    const nextBirthdayYear = nextBirthday.isBefore(today) ? today.year() + 1 : today.year();
    const nextBirthdayDate = nextBirthday.date(birthDay).month(birthMonth - 1).year(nextBirthdayYear);
    const daysTillNextBirthday = nextBirthdayDate.diff(today, 'day');

    setAgeDetails({
      ageInYears,
      birthDate: birthDate.format('dddd, MMMM D, YYYY'),
      ageOn: today.format('dddd, MMMM D, YYYY'),
      exactAge: `${ageInYears} years ${today.month() - birthMonth + (ageInYears * 12) - ageInMonths} months ${today.date() - birthDay + (today.daysInMonth() - birthDate.date())} days`,
      totalMonths: ageInMonths,
      totalWeeks: weeks,
      totalDays: ageInDays,
      totalHours: ageInDays * 24,
      totalMinutes: ageInDays * 24 * 60,
      totalSeconds: ageInDays * 24 * 60 * 60,
      nextBirthdayDate: nextBirthdayDate.format('dddd, MMMM D, YYYY'),
      daysTillNextBirthday,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Age Calculator</h1>

        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-600">
            Today is Date: <strong>{today.format('MMMM D, YYYY')}</strong>
          </h2>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Day of Birth</label>
          <select
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Month of Birth</label>
          <select
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>{dayjs().month(month - 1).format('MMMM')}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Year of Birth</label>
          <select
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition duration-200"
        >
          Calculate Age
        </button>

        {ageDetails && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-800">
              Age = <strong>{ageDetails.ageInYears} years</strong>
            </p>
            <p className="text-lg text-gray-800">
              Born on: <strong>{ageDetails.birthDate}</strong>
            </p>
            <p className="text-lg text-gray-800">
              Age on: <strong>{ageDetails.ageOn}</strong>
            </p>
            <p className="text-lg text-gray-800">
              Exact age in different time units:
            </p>
            <ul className="list-disc list-inside text-left mx-auto max-w-md">
              <li>{ageDetails.exactAge}</li>
              <li>= {ageDetails.totalMonths} months</li>
              <li>= {ageDetails.totalWeeks} weeks</li>
              <li>= {ageDetails.totalDays} days</li>
              <li>≈ {ageDetails.totalHours} hours</li>
              <li>≈ {ageDetails.totalMinutes} minutes</li>
              <li>≈ {ageDetails.totalSeconds} seconds</li>
            </ul>
            <p className="text-lg text-gray-800 mt-4">
              {ageDetails.daysTillNextBirthday} days till next birthday or anniversary
            </p>
            <p className="text-lg text-gray-800">
              <strong>{ageDetails.nextBirthdayDate}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;

