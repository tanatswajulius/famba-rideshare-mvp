// /frontend/src/pages/DriverDashboard.js
import React, { useEffect, useState } from 'react';
import API from '../api';

function DriverDashboard() {
  const [allRides, setAllRides] = useState([]);

  const fetchRides = async () => {
    // For MVP, let's just get all rides. 
    // In production, you'd filter only `REQUESTED` rides or do a dedicated endpoint.
    try {
      const res = await API.get('/rides/my-rides'); 
      // This only returns rides for the user if user is rider. 
      // For a real driver approach, you'd create a new route
      // that returns rides with status REQUESTED. We'll keep it simple for now.
      // Here's a small hack for demonstration:
      setAllRides(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const acceptRide = async (id) => {
    try {
      await API.post(`/rides/accept/${id}`);
      alert('Ride accepted!');
      fetchRides();
    } catch (err) {
      alert(err.response?.data?.message || 'Error accepting ride');
    }
  };

  const completeRide = async (id) => {
    try {
      await API.post(`/rides/complete/${id}`);
      alert('Ride completed!');
      fetchRides();
    } catch (err) {
      alert(err.response?.data?.message || 'Error completing ride');
    }
  };

  return (
    <div>
      <h2>Driver Dashboard</h2>
      <button onClick={fetchRides}>Refresh Rides</button>
      <ul>
        {allRides.map(ride => (
          <li key={ride._id}>
            <strong>Ride:</strong> {ride.pickupLocation} → {ride.dropoffLocation} |
            Status: {ride.status}
            <button onClick={() => acceptRide(ride._id)} disabled={ride.status !== 'REQUESTED'}>
              Accept
            </button>
            <button onClick={() => completeRide(ride._id)} disabled={ride.status !== 'IN_PROGRESS'}>
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverDashboard;
