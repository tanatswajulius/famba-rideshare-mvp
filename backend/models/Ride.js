// /backend/models/Ride.js
const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  fare: { type: Number, default: 1.5 },  // example flat or minimal fare
  status: {
    type: String,
    enum: ['REQUESTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'],
    default: 'REQUESTED'
  }
}, { timestamps: true });

module.exports = mongoose.model('Ride', RideSchema);
