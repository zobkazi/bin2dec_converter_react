import { useState } from "react";

// Function to format number as currency
const formatCurrency = (value, currencySymbol) => {
  const cleanedValue = value.replace(/[^0-9]/g, "");
  const numberValue = parseInt(cleanedValue, 10);

  if (!isNaN(numberValue)) {
    return `${currencySymbol}${numberValue
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00`;
  }

  return "";
};

const CurrencyInput = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("$");

  const currencyOptions = [
    { label: "USD - US Dollar", symbol: "$" },
    { label: "EUR - Euro", symbol: "€" },
    { label: "GBP - British Pound", symbol: "£" },
    { label: "JPY - Japanese Yen", symbol: "¥" },
    { label: "INR - Indian Rupee", symbol: "₹" },
    { label: "BDT - Bangladeshi Taka", symbol: "৳" },
    { label: "PKR - Pakistani Rupee", symbol: "₨" },
    { label: "AUD - Australian Dollar", symbol: "A$" },
    { label: "CAD - Canadian Dollar", symbol: "C$" },
    { label: "CHF - Swiss Franc", symbol: "Fr" },
    { label: "CNY - Chinese Yuan", symbol: "¥" },
    { label: "RUB - Russian Ruble", symbol: "₽" },
    { label: "ZAR - South African Rand", symbol: "R" },
    { label: "BRL - Brazilian Real", symbol: "R$" },
    { label: "MXN - Mexican Peso", symbol: "$" },
  ];

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleButtonClick = () => {
    const formattedValue = formatCurrency(amount, currency);
    setAmount(formattedValue);
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-purple-800">
<div className="max-w-sm mx-auto bg-purple-400 shadow-md rounded-lg p-10 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-white">Currency Input</h2>
      
      <label
        htmlFor="currency"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Currency:
      </label>
      <select
        id="currency"
        value={currency}
        onChange={handleCurrencyChange}
        className="block w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {currencyOptions.map((option) => (
          <option key={option.symbol} value={option.symbol}>
            {option.label}
          </option>
        ))}
      </select>

      <label
        htmlFor="amount"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Amount:
      </label>
      <input
        type="text"
        id="amount"
        value={amount}
        onChange={handleChange}
        placeholder={`${currency}0.00`}
        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleButtonClick}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Format Amount
      </button>
    </div>
</div>
  );
};

export default CurrencyInput;
