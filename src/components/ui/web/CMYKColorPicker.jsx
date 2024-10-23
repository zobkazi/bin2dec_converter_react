import { useState } from "react";

const CMYKColorPicker = () => {
  const [cyan, setCyan] = useState(0);
  const [magenta, setMagenta] = useState(0);
  const [yellow, setYellow] = useState(0);
  const [black, setBlack] = useState(0);
  const [copied, setCopied] = useState(false);

  // Function to convert CMYK to RGB
  const cmykToRgb = (c, m, y, k) => {
    const r = Math.round(255 * (1 - c) * (1 - k));
    const g = Math.round(255 * (1 - m) * (1 - k));
    const b = Math.round(255 * (1 - y) * (1 - k));
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Calculate RGB color from CMYK values
  const rgbColor = cmykToRgb(
    cyan / 100,
    magenta / 100,
    yellow / 100,
    black / 100
  );

  // Copy CMYK code to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show copied message for 2 seconds
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="bg-purple-400 shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">CMYK Color Picker</h1>

        {/* Color display */}
        <div
          className="h-32 w-full mb-6 rounded-lg"
          style={{ backgroundColor: rgbColor }}
        ></div>

        {/* Sliders for Cyan, Magenta, Yellow, and Black */}
        <div className="mb-4">
          <label className="block font-semibold mb-2 text-cyan-500">
            Cyan: {cyan}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={cyan}
            onChange={(e) => setCyan(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2 text-pink-500">
            Magenta: {magenta}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={magenta}
            onChange={(e) => setMagenta(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2 text-yellow-500">
            Yellow: {yellow}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={yellow}
            onChange={(e) => setYellow(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2 text-black-500">
            Black (Key): {black}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={black}
            onChange={(e) => setBlack(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Display the CMYK Code */}
        <div className="mt-4 text-xl font-semibold">
          CMYK: ({cyan}%, {magenta}%, {yellow}%, {black}%)
        </div>

        {/* Button to copy CMYK code */}
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() =>
            copyToClipboard(
              `CMYK(${cyan}%, ${magenta}%, ${yellow}%, ${black}%)`
            )
          }
        >
          {copied ? "CMYK Copied!" : "Copy CMYK"}
        </button>

        {/* Display the RGB Conversion */}
        <div className="mt-4 text-xl font-semibold">RGB: {rgbColor}</div>

        {/* Button to copy RGB code */}
        <button
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
          onClick={() => copyToClipboard(rgbColor)}
        >
          {copied ? "RGB Copied!" : "Copy RGB"}
        </button>
      </div>
    </div>
  );
};

export default CMYKColorPicker;
