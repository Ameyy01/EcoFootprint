const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  vehicleCategory: {
    type: String,
    required: true
  },
  distanceKm: {
    type: Number,
    required: true
  },
  fuelEfficiency: {
    type: Number,
    required: true
  },
  emissionKgCO2: {
    type: Number,
    required: true
  }
});

const emissionLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  userName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  activities: [activitySchema],
  totalEmissionKg: {
    type: Number,
    required: true
  },
  details: {
    type: Map,
    of: Number,
    default: {}
  }
}, {
  timestamps: true
});

// Create compound index for efficient querying
emissionLogSchema.index({ userId: 1, date: 1 });

const EmissionLog = mongoose.model('EmissionLog', emissionLogSchema);

module.exports = EmissionLog; 