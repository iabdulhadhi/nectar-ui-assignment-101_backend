const Location = require('../models/Location');
const moment = require('moment');

const handleError = (res, err) => {
  res.status(500).json({
    type: "error",
    message: "Something went wrong, please try again",
    error: err.message || "Internal Server Error"
  });
};

const LocationController = {
  async createLocation(req, res) {
    try {
      const data = req.body;

      const newLocation = new Location(data);

      const savedLocation = await newLocation.save();

      res.status(201).json({
        type: "success",
        message: "Location created successfully",
        result: savedLocation
      });
    } catch (err) {
      handleError(res, err);
    }
  },

  async getLocations(req, res) {
    try {
      const locations = await Location.find().sort({ createdAt: -1 });
      const formattedLocations = locations.map(location => ({
        ...location.toObject(),
        createdAt: moment(location.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(location.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      }));
      res.status(200).json({
        type: "success",
        result: formattedLocations
      });
    } catch (err) {
      handleError(res, err);
    }
  },

  async getLocation(req, res) {
    try {
      const location = await Location.findById(req.params.id);
      if (!location) {
        return res.status(404).json({
          type: "error",
          message: "Location not found"
        });
      }
      res.status(200).json({
        type: "success",
        result: location
      });
    } catch (err) {
      handleError(res, err);
    }
  },

  async updateLocation(req, res) {
    try {
      const updatedLocation = await Location.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, { new: true });
      if (!updatedLocation) {
        return res.status(404).json({
          type: "error",
          message: "Location not found"
        });
      }
      res.status(200).json({
        type: "success",
        message: "Location updated successfully",
        result: updatedLocation
      });
    } catch (err) {
      handleError(res, err);
    }
  },

  async deleteLocation(req, res) {
    try {
      const deletedLocation = await Location.findByIdAndDelete(req.params.id);
      if (!deletedLocation) {
        return res.status(404).json({
          type: "error",
          message: "Location not found"
        });
      }
      res.status(200).json({
        type: "success",
        message: "Location has been deleted successfully"
      });
    } catch (err) {
      handleError(res, err);
    }
  }
};

module.exports = LocationController;
