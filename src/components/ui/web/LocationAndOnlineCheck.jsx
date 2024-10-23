import React, { useEffect, useState } from "react";

const LocationAndOnlineCheck = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    // Get user's location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error(error.message);
            setLocation({ latitude: null, longitude: null });
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getLocation();

    // Check online status
    const updateOnlineStatus = () => {
      setOnlineStatus(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="bg-purple-400 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Location and Online Status</h1>

        <div className="mb-4">
          <p className="text-lg">
            {location.latitude !== null && location.longitude !== null ? (
              <>
                Latitude:{" "}
                <span className="font-semibold">{location.latitude}</span>
                <br />
                Longitude:{" "}
                <span className="font-semibold">{location.longitude}</span>
              </>
            ) : (
              <span className="text-red-500 font-semibold">Unable to retrieve location.</span>
            )}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-lg">
            Online Status:{" "}
            <span
              className={`font-semibold ${
                onlineStatus ? "text-green-500" : "text-red-500"
              }`}
            >
              {onlineStatus ? "Online" : "Offline"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationAndOnlineCheck;
