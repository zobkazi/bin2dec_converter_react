import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BinaryInput() {
  const [binaaryText, setBynaryText] = useState("");
  const [decimalText, setDecimalText] = useState("");
  const [errmessage, setErrMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (binaaryText.match(/^[0-1]+$/g) === null) {
      setErrMessage(toast(" 👺 Invalid input, type 0 or 1 🔥"));
      return;
    } else {
      setErrMessage(toast("🎈 Success for binary input 🎇"));
    }

    setErrMessage("");

    const reversedBinaryText = binaaryText.split("").map(Number).reverse();

    const result = reversedBinaryText.reduce(
      (accumulator, currentValue, txt) =>
        accumulator + currentValue * Math.pow(2, txt)
    );
    setDecimalText(result);
  };

  return (
    <div>
      <div>
        {<div>{errmessage}</div>}

        <form
          className=" mx-auto mb-0 mt-8 max-w-md space-y-4"
          onSubmit={handleSubmit}>
          <label
            htmlFor="UserEmail"
            className="   text-center block text-3xl font-medium text-gray-700">
            Binary to Decimal Converter
          </label>
          <input
            type="text"
            name="binary"
            placeholder="Enter 0 or 1"
            value={binaaryText}
            onChange={(e) => setBynaryText(e.target.value)}
            className="text-center w-60 p-5 mt-8 border-4 border-teal-400 rounded-md shadow-sm text-2xl"
          />
          <button
            className=" m-4 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            type="submit">
            Convert
          </button>
          <p className="text-9xl text-center mt-280">{decimalText}</p>
        </form>
        <ToastContainer autoClose={100}  />
      </div>
    </div>
  );
}

export default BinaryInput;
