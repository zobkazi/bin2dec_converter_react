
import  { useState } from 'react';



const numberToBengaliWords = (num) => {
  const bengaliNumbers = ["", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়"];
  const tens = ["", "দশ", "বিশ", "ত্রিশ", "চল্লিশ", "পঞ্চাশ", "ষাট", "সত্তর", "আশি", "নব্বই"];
  const teens = ["", "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোল", "সতেরো", "আঠারো", "উনিশ"];
  const hundreds = "শত";
  const thousands = "হাজার";

  let words = "";

  if (num >= 1000) {
    const thousandPart = Math.floor(num / 1000);
    words += bengaliNumbers[thousandPart] + " " + thousands;
    num %= 1000;
  }

  if (num >= 100) {
    const hundredPart = Math.floor(num / 100);
    words += " " + bengaliNumbers[hundredPart] + " " + hundreds;
    num %= 100;
  }

  if (num >= 20) {
    const tenPart = Math.floor(num / 10);
    words += " " + tens[tenPart];
    num %= 10;
  } else if (num >= 10) {
    words += " " + teens[num - 10];
    num = 0;
  }

  if (num > 0) {
    words += " " + bengaliNumbers[num];
  }

  return words.trim();
};

const convertPhraseToBengali = (phrase) => {
  const parts = phrase.split(/[\s,]+/); // Split by spaces or commas
  return parts
    .map((part) => {
      if (!isNaN(part)) {
        return numberToBengaliWords(parseInt(part, 10));
      }
      return part === 'and' ? 'এবং' : part; // Convert "and" to "এবং" and leave other words unchanged
    })
    .join(' ');
};



const Num2Bn = () => {
  const [input, setInput] = useState('');
  const [bengaliPhrase, setBengaliPhrase] = useState('');

  const handleConvert = () => {
    const result = convertPhraseToBengali(input);
    setBengaliPhrase(result);
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center text-gray-700">
        সংখ্যা ও বাক্যাংশ থেকে বাংলায় রূপান্তর
      </h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="সংখ্যা এবং বাক্যাংশ লিখুন (উদাহরণ: 1021 and 2014)"
      />
      <button
        onClick={handleConvert}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        রূপান্তর করুন
      </button>
      {bengaliPhrase && (
        <p className="text-xl text-center text-gray-800">
          বাংলা: <span className="font-semibold">{bengaliPhrase}</span>
        </p>
      )}
    </div>
  );
};

export default Num2Bn;
