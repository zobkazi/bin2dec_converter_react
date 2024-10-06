import  { useState } from 'react';

function CurrencyInput() {
  const [amount, setAmount] = useState('');

  const formatCurrency = (value) => {
    // Remove any characters other than digits and decimal point
    value = value.replace(/[^0-9.]/g, '');

    // Convert the value to a float and format as currency
    const formattedValue = parseFloat(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Remove the dollar sign added by toLocaleString
    return formattedValue.replace('$', '');
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setAmount(formatCurrency(inputValue));
  };

  return (
    <div>
      <label htmlFor="currency-input">Amount: </label>
      <input
        type="text"
        id="currency-input"
        value={`$${amount}`}
        onChange={handleChange}
        placeholder="Enter amount"
      />
    </div>
  );
}

export default CurrencyInput;
