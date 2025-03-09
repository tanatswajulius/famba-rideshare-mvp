// /backend/routes/rideRoutes.js
const express = require('express');
const router = express.Router();
const { requestRide, getRidesForRider, acceptRide, completeRide } = require('../controllers/rideController');
const { authMiddleware, driverOnly, riderOnly } = require('../middlewares/authMiddleware');

// Rider requests a ride
router.post('/request', authMiddleware, riderOnly, requestRide);

// Rider fetch rides
router.get('/my-rides', authMiddleware, riderOnly, getRidesForRider);

// Driver accept ride
router.post('/accept/:rideId', authMiddleware, driverOnly, acceptRide);

// Driver completes ride
router.post('/complete/:rideId', authMiddleware, driverOnly, completeRide);

module.exports = router;
