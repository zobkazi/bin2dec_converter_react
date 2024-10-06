import React, { useState } from "react";

// Function to format number as currency
const formatCurrency = (value, currencySymbol) => {
  const cleanedValue = value.replace(/[^0-9]/g, "");
  const numberValue = parseInt(cleanedValue, 10);

  if (!isNaN(numberValue)) {
    return `${currencySymbol}${numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00`;
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
  ];

  const handleChange = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleBlur = () => {
    const formattedValue = formatCurrency(amount, currency);
    setAmount(formattedValue);
  };

  const selectedCurrencySymbol = currency;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">Currency Input</h2>
      <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
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

      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
        Amount:
      </label>
      <input
        type="text"
        id="amount"
        value={amount}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={`${selectedCurrencySymbol}0.00`}
        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default CurrencyInput;
