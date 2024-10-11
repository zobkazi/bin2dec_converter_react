
import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/bn';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

dayjs.extend(customParseFormat);
dayjs.locale('bn');

const banglaMonths = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'অগাস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const AgeCalculatorBangla = () => {
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [ageDetails, setAgeDetails] = useState(null);
  const today = dayjs();
  const resultRef = useRef();

  const years = Array.from({ length: 100 }, (_, i) => today.year() - i);
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
      exactAge: `${ageInYears} বছর ${today.month() - birthMonth + (ageInYears * 12) - ageInMonths} মাস ${today.date() - birthDay + (today.daysInMonth() - birthDate.date())} দিন`,
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

  const handlePrint = () => {
    const printContent = resultRef.current;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title><style>@page { size: A4; margin: 20mm; } body { font-family: Arial, sans-serif; font-size: 12pt; }</style></head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleCopy = () => {
    const resultText = `
      বয়স = ${ageDetails.ageInYears} বছর
      জন্ম তারিখ: ${ageDetails.birthDate}
      বয়স বর্তমান তারিখে: ${ageDetails.ageOn}
      বিভিন্ন সময়ের ইউনিটে বয়স:
      ${ageDetails.exactAge}
      = ${ageDetails.totalMonths} মাস
      = ${ageDetails.totalWeeks} সপ্তাহ
      = ${ageDetails.totalDays} দিন
      ≈ ${ageDetails.totalHours} ঘণ্টা
      ≈ ${ageDetails.totalMinutes} মিনিট
      ≈ ${ageDetails.totalSeconds} সেকেন্ড
      পরবর্তী জন্মদিনের জন্য ${ageDetails.daysTillNextBirthday} দিন বাকি
      ${ageDetails.nextBirthdayDate}
    `;
    navigator.clipboard.writeText(resultText).then(() => {
      alert('ফলাফল কপি হয়েছে!');
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'বয়স গণক',
        text: `বয়স = ${ageDetails.ageInYears} বছর\nজন্ম তারিখ: ${ageDetails.birthDate}\nবয়স বর্তমান তারিখে: ${ageDetails.ageOn}\n${ageDetails.exactAge}\nপরবর্তী জন্মদিনের জন্য ${ageDetails.daysTillNextBirthday} দিন বাকি\n${ageDetails.nextBirthdayDate}`,
        url: window.location.href,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      alert('শেয়ারিং সাপোর্ট করা হয় না');
    }
  };

  const handleSaveImage = () => {
    const element = resultRef.current;
    if (!element) return;

    html2canvas(element, { scale: 2 }).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'age-calculator-result.png');
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">বয়স গণক</h1>

        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-600">
            আজকের তারিখ: <strong>{today.format('MMMM D, YYYY')}</strong>
          </h2>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">জন্ম তারিখ</label>
          <select
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">দিন নির্বাচন করুন</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">জন্ম মাস</label>
          <select
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">মাস নির্বাচন করুন</option>
            {banglaMonths.map((month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">জন্ম বছর</label>
          <select
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">বছর নির্বাচন করুন</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition duration-200"
        >
          বয়স গণনা করুন
        </button>

        {ageDetails && (
          <div ref={resultRef} className="mt-6 text-center">
            <p className="text-lg text-gray-800">
              বয়স = <strong>{ageDetails.ageInYears} বছর</strong>
            </p>
            <p className="text-lg text-gray-800">
              জন্ম তারিখ: <strong>{ageDetails.birthDate}</strong>
            </p>
            <p className="text-lg text-gray-800">
              বয়স বর্তমান তারিখে: <strong>{ageDetails.ageOn}</strong>
            </p>
            <p className="text-lg text-gray-800">
              বিভিন্ন সময়ের ইউনিটে বয়স:
            </p>
            <ul className="list-disc list-inside text-left mx-auto max-w-md">
              <li>{ageDetails.exactAge}</li>
              <li>= {ageDetails.totalMonths} মাস</li>
              <li>= {ageDetails.totalWeeks} সপ্তাহ</li>
              <li>= {ageDetails.totalDays} দিন</li>
              <li>≈ {ageDetails.totalHours} ঘণ্টা</li>
              <li>≈ {ageDetails.totalMinutes} মিনিট</li>
              <li>≈ {ageDetails.totalSeconds} সেকেন্ড</li>
            </ul>
            <p className="text-lg text-gray-800">
              পরবর্তী জন্মদিনের জন্য <strong>{ageDetails.daysTillNextBirthday} দিন</strong> বাকি
            </p>
            <p className="text-lg text-gray-800">
              <strong>{ageDetails.nextBirthdayDate}</strong>
            </p>
          </div>
        )}

        {ageDetails && (
          <div className="flex justify-between mt-4">
            <button onClick={handlePrint} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200">
              প্রিন্ট
            </button>
            <button onClick={handleCopy} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-200">
              কপি
            </button>
            <button onClick={handleShare} className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition duration-200">
              শেয়ার
            </button>
            <button onClick={handleSaveImage} className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-200">
              সেভ ইমেজ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculatorBangla;
