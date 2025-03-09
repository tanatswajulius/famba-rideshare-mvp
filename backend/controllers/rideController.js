// /backend/controllers/rideController.js
const Ride = require('../models/Ride');

exports.requestRide = async (req, res) => {
  try {
    // The user requesting must be a 'rider'
    // We get userId from the JWT if we have an auth middleware
    const { pickupLocation, dropoffLocation } = req.body;
    const riderId = req.user.userId; // from decoded JWT

    const newRide = await Ride.create({
      riderId,
      pickupLocation,
      dropoffLocation
    });
    return res.status(201).json(newRide);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getRidesForRider = async (req, res) => {
  try {
    const rides = await Ride.find({ riderId: req.user.userId });
    return res.json(rides);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.acceptRide = async (req, res) => {
  try {
    // The user accepting must be a 'driver'
    const { rideId } = req.params;
    const driverId = req.user.userId;

    let ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    if (ride.status !== 'REQUESTED') {
      return res.status(400).json({ message: 'Ride is not available to accept' });
    }

    ride.driverId = driverId;
    ride.status = 'IN_PROGRESS';
    await ride.save();

    return res.json(ride);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.completeRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    let ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    // Only the assigned driver can mark it complete
    if (ride.driverId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You are not assigned to this ride' });
    }

    ride.status = 'COMPLETED';
    await ride.save();
    return res.json(ride);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
