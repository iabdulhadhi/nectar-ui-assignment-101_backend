const express = require('express');
const router = express.Router();

const { accessLevelVerifier } = require('../middlewares/verifyToken');
const LocationController = require('../controllers/LocationController');

router.post('/', accessLevelVerifier, LocationController.createLocation);

router.get('/', accessLevelVerifier, LocationController.getLocations);
router.get('/:id', accessLevelVerifier, LocationController.getLocation);

router.put('/:id', accessLevelVerifier, LocationController.updateLocation);
router.delete('/:id', accessLevelVerifier, LocationController.deleteLocation);

module.exports = router;