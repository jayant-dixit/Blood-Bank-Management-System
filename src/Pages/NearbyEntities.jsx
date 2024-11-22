import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Context } from "../App";
import api from "../services/api";

// Fix default marker icon for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const NearbyPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [radius, setRadius] = useState(5000); // Default radius in meters
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const {isLoading, setIsLoading} = useContext(Context);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  }, []);

  // Fetch nearby entities
  const fetchNearbyEntities = async () => {
    if (!latitude || !longitude) {
      alert("Location not available!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.get(
        `/api/v1/users/location/nearby?longitude=${longitude}&latitude=${latitude}&radius=${radius}${
          bloodGroup ? `&bloodGroup=${bloodGroup}` : ""
        }`
      );

      setDonors(response.data.data.donors || []);
      setBloodBanks(response.data.data.bloodBanks || []);
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Failed to fetch nearby entities!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Find Nearby Donors & Blood Banks</h1>
        <p className="text-gray-600">Locate donors and blood banks around you easily!</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Radius (meters)</label>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter radius (e.g., 5000)"
            />
          </div>

          {/* <div>
            <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div> */}

          <div className="flex items-end">
            <button
              onClick={fetchNearbyEntities}
              className="w-full bg-[rgb(190,28,25)] hover:bg-[rgb(194,29,25)] text-white py-2 px-4 rounded"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      {latitude && longitude && (
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          className="h-96 rounded shadow-md mb-6"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {/* User Location */}
          <Marker position={[latitude, longitude]}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Donors */}
          {donors.map((donor, index) => (
            <Marker
              key={`donor-${index}`}
              position={[donor.location.latitude, donor.location.longitude]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{donor.name}</h3>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Request</button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Blood Banks */}
          {bloodBanks.map((bank, index) => (
            <Marker
              key={`bank-${index}`}
              position={[bank.location.latitude, bank.location.longitude]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{bank.name}</h3>
                  <p>Contact: {bank.contact}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* Results List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-600">Nearby Donors</h2>
          {donors.map((donor, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md mb-2">
              <p>
                <strong>Name:</strong> {donor.name}
              </p>
              <p>
                <strong>Blood Group:</strong> {donor.bloodGroup}
              </p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-600">Nearby Blood Banks</h2>
          {bloodBanks.map((bank, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md mb-2">
              <p>
                <strong>Name:</strong> {bank.name}
              </p>
              <p>
                <strong>Contact:</strong> {bank.contactNumber}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyPage;
