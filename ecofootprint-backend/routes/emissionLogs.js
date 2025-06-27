/*
const express = require('express');
const router = express.Router();
const EmissionLog = require('../models/EmissionLog');

// Create new emission log
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      userName,
      vehicleName,
      vehicleType,
      vehicleCategory,
      fuelEfficiency,
      distance,
    } = req.body;

    // Calculate CO2 emission based on vehicle category and fuel efficiency
    let emissionFactor;
    switch (vehicleCategory) {
      case 'Petrol':
        emissionFactor = 2.31; // kg CO2 per liter
        break;
      case 'Diesel':
        emissionFactor = 2.68; // kg CO2 per liter
        break;
      case 'CNG':
        emissionFactor = 2.16; // kg CO2 per kg
        break;
      case 'Electric':
        emissionFactor = 0.4; // kg CO2 per kWh (assuming grid mix)
        break;
      default:
        emissionFactor = 2.31; // Default to petrol
    }

    const fuelUsed = distance / fuelEfficiency;
    const emission = fuelUsed * emissionFactor;

    const emissionLog = new EmissionLog({
      userId,
      userName,
      vehicleName,
      vehicleType,
      vehicleCategory,
      fuelEfficiency,
      distance,
      emission,
    });

    await emissionLog.save();

    res.status(201).json({
      success: true,
      emission,
      log: emissionLog,
    });
  } catch (error) {
    console.error('Error creating emission log:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create emission log: ' + error.message,
    });
  }
});

// Get emission logs for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await EmissionLog.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 entries

    res.json(logs);
  } catch (error) {
    console.error('Error fetching emission logs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch emission logs: ' + error.message,
    });
  }
});

// Get emission data for charts
router.get('/chart-data/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    console.log('Fetching chart data for userId:', userId);
    console.log('Date range:', { startDate, endDate });

    // Validate userId
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Build date filter
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    console.log('MongoDB query:', {
      userId,
      ...dateFilter
    });

    // Get all emission logs for the user
    const emissionLogs = await EmissionLog.find({
      userId,
      ...dateFilter
    }).sort({ date: 1 });

    console.log('Found emission logs:', emissionLogs.length);
    if (emissionLogs.length > 0) {
      console.log('First log:', emissionLogs[0]);
    }

    if (!emissionLogs || emissionLogs.length === 0) {
      return res.json({
        success: true,
        data: []
      });
    }

    // Process data for the chart
    const chartData = emissionLogs.map(log => ({
      date: log.date.toISOString().split('T')[0], // Format: YYYY-MM-DD
      totalEmission: log.totalEmissionKg
    }));

    console.log('Processed chart data:', chartData);

    res.json({
      success: true,
      data: chartData
    });
  } catch (error) {
    console.error('Detailed error in chart-data endpoint:', {
      message: error.message,
      stack: error.stack,
      userId: req.params.userId
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chart data: ' + error.message
    });
  }
});

module.exports = router;
*/
