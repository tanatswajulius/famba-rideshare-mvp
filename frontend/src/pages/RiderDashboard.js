// /frontend/src/pages/RiderDashboard.js
import React, { useEffect, useState } from 'react';
import API from '../api';

function RiderDashboard() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [rides, setRides] = useState([]);

  const fetchRides = async () => {
    try {
      const res = await API.get('/rides/my-rides');
      setRides(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const requestRide = async () => {
    try {
      await API.post('/rides/request', { pickupLocation, dropoffLocation });
      alert('Ride requested!');
      fetchRides();
    } catch (err) {
      alert(err.response?.data?.message || 'Error requesting ride');
    }
  };

  return (
    <div>
      <h2>Rider Dashboard</h2>
      <div style={{ margin: '1rem 0' }}>
        <input
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />
        <input
          placeholder="Dropoff Location"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
        />
        <button onClick={requestRide}>Request Ride</button>
      </div>
      <h3>My Rides</h3>
      <ul>
        {rides.map((ride) => (
          <li key={ride._id}>
            From {ride.pickupLocation} to {ride.dropoffLocation} | Status: {ride.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RiderDashboard;
