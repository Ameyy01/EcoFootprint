const express = require('express');
const router = express.Router();
const EmissionLog = require('../models/EmissionLog');
const User = require('../models/User');

// Helper function to calculate emission
function calculateEmission(vehicleCategory, fuelEfficiency, distance) {
  // Emission factors in kg CO2 per liter or kWh
  const emissionFactors = {
    Petrol: 2.31,    // kg CO2 per liter
    Diesel: 2.68,
    CNG: 1.6,
    Electric: 0.05,  // kg CO2 per kWh
  };

  console.log('Calculation inputs:', {
    vehicleCategory,
    fuelEfficiency,
    distance,
    factor: emissionFactors[vehicleCategory]
  });

  const factor = emissionFactors[vehicleCategory] || 0;
  if (fuelEfficiency <= 0) return 0;

  // Calculate fuel consumed
  const fuelConsumed = distance / fuelEfficiency;
  // Calculate emission
  const emission = fuelConsumed * factor;
  const roundedEmission = Number(emission.toFixed(2));
  
  console.log('Emission calculation:', {
    fuelConsumed,
    factor,
    emission,
    roundedEmission
  });

  return roundedEmission;
}

// Leaderboard route: GET /api/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    // Get top 10 users with the lowest total emissions
    const leaderboard = await User.find(
      { totalEmissionKg: { $gt: 0 }, name: { $exists: true, $ne: null, $ne: '' } },
      { userId: 1, name: 1, totalEmissionKg: 1, _id: 0 }
    )
      .sort({ totalEmissionKg: 1 }) // Ascending: lower is better
      .limit(10)
      .lean();
    res.json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Add or update emission log
router.post('/', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { userId, userName, vehicleName, vehicleType, vehicleCategory, fuelEfficiency, distance } = req.body;
    console.log('Extracted fields:', { userName, vehicleName, vehicleType, vehicleCategory, fuelEfficiency, distance });

    // Validate required fields
    if (!userId || !userName || !vehicleName || !vehicleType || !vehicleCategory || !fuelEfficiency || !distance) {
      console.log('Missing required fields:', { userId, userName, vehicleName, vehicleType, vehicleCategory, fuelEfficiency, distance });
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Find user
    const user = await User.findOne({ userId: userId });
    console.log('Found user:', user);
    if (!user) {
      console.log('User not found with userId:', userId);
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Calculate emission
    const emissionKgCO2 = calculateEmission(vehicleCategory, Number(fuelEfficiency), Number(distance));
    console.log('Calculated emission:', emissionKgCO2);

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log('Today\'s date:', today);

    // Find or create today's emission log
    let emissionLog = await EmissionLog.findOne({
      userId: user.userId,
      date: today,
    });
    console.log('Found existing emission log:', emissionLog);

    if (!emissionLog) {
      console.log('Creating new emission log for today');
      try {
        // Create new emission log for today
        emissionLog = await EmissionLog.create({
          userId: user.userId,
          userName: userName,
          date: today,
          activities: [{
            vehicleName,
            vehicleType,
            vehicleCategory,
            distanceKm: Number(distance),
            fuelEfficiency: Number(fuelEfficiency),
            emissionKgCO2,
          }],
          totalEmissionKg: emissionKgCO2,
        });
        console.log('Created new emission log:', emissionLog);
      } catch (error) {
        console.error('Error creating emission log:', error);
        throw error;
      }
    } else {
      console.log('Updating existing emission log');
      try {
        // Initialize activities array if it doesn't exist
        if (!emissionLog.activities) {
          console.log('Initializing activities array');
          emissionLog.activities = [];
        }

        // Add new activity
        const newActivity = {
          vehicleName,
          vehicleType,
          vehicleCategory,
          distanceKm: Number(distance),
          fuelEfficiency: Number(fuelEfficiency),
          emissionKgCO2,
        };
        console.log('Adding new activity:', newActivity);

        // Update activities array
        emissionLog.activities = [...emissionLog.activities, newActivity];
        
        // Update total emission
        const totalEmission = emissionLog.activities.reduce(
          (sum, activity) => sum + (activity.emissionKgCO2 || 0),
          0
        );
        emissionLog.totalEmissionKg = Number(totalEmission.toFixed(2));
        console.log('Updated total emission:', emissionLog.totalEmissionKg);

        // Ensure userName is set
        emissionLog.userName = userName;

        // Save with validation disabled for this update
        await emissionLog.save({ validateBeforeSave: false });
        console.log('Updated emission log:', emissionLog);
      } catch (error) {
        console.error('Error updating emission log:', error);
        throw error;
      }
    }

    // Update user's totalEmissionKg in users collection
    try {
      const allLogs = await EmissionLog.find({ userId: user.userId });
      const totalUserEmission = allLogs.reduce((sum, log) => sum + (log.totalEmissionKg || 0), 0);
      await User.updateOne(
        { userId: user.userId },
        { $set: { totalEmissionKg: Number(totalUserEmission.toFixed(2)) } }
      );
      console.log('Updated user totalEmissionKg:', totalUserEmission);
    } catch (err) {
      console.error('Failed to update user totalEmissionKg:', err);
    }

    res.json({
      success: true,
      emission: emissionKgCO2,
      totalEmission: emissionLog.totalEmissionKg,
      message: 'Emission data saved successfully',
    });
  } catch (error) {
    console.error('Error in emission log:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get user's emission logs
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Received request for userId:', userId);

    // Find user first
    const user = await User.findOne({ userId: userId });
    console.log('Found user:', user);
    
    if (!user) {
      console.log('User not found with userId:', userId);
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Find emission logs for this user
    const logs = await EmissionLog.find({ userId: user.userId })
      .sort({ date: -1 });
    
    console.log('Found emission logs:', logs.length);

    return res.status(200).json({
      success: true,
      logs: logs
    });
  } catch (error) {
    console.error('Error fetching emission logs:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// Get emission data for charts
router.get('/chart-data/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    console.log('Frontend userId:', userId);
    console.log('Date range:', { startDate, endDate });

    // Validate userId and dates
    if (!userId) {
      throw new Error('User ID is required');
    }

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Start date and end date are required'
      });
    }

    // Find user first
    const user = await User.findOne({ userId: userId });
    if (!user) {
      console.log('User not found with userId:', userId);
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    console.log('Found user:', {
      _id: user._id,
      userId: user.userId,
      name: user.name
    });

    // Convert dates to start and end of day
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    console.log('Query date range:', {
      start: start.toISOString(),
      end: end.toISOString()
    });

    // Find emission logs within date range using the user's Firebase UID
    const logs = await EmissionLog.find({
      userId: user.userId,
      date: {
        $gte: start,
        $lte: end
      }
    }).sort({ date: 1 });

    console.log('Found emission logs in date range:', logs.length);
    if (logs.length > 0) {
      console.log('First log in date range:', {
        _id: logs[0]._id,
        userId: logs[0].userId,
        date: logs[0].date,
        totalEmissionKg: logs[0].totalEmissionKg
      });
    }

    // Format data for line graph
    const graphData = logs.map(log => ({
      date: log.date.toISOString().split('T')[0],
      emission: log.totalEmissionKg
    }));

    // Calculate max emission value and round up to nearest 10
    const maxEmission = Math.max(...logs.map(log => log.totalEmissionKg));
    const yAxisMax = Math.ceil(maxEmission / 10) * 10; // Round up to nearest 10

    return res.status(200).json({
      success: true,
      data: graphData,
      chartConfig: {
        yAxisMax: yAxisMax || 100, // Default to 100 if no data
        yAxisStep: Math.ceil(yAxisMax / 10) // Divide y-axis into 10 steps
      }
    });
  } catch (error) {
    console.error('Detailed error in chart-data endpoint:', {
      message: error.message,
      stack: error.stack,
      userId: req.params.userId
    });
    
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch chart data: ' + error.message
    });
  }
});

// Test endpoint to create sample emission logs
router.post('/create-sample-logs', async (req, res) => {
  try {
    const userId = "684d4afe2202c09ce1fedef8";
    
    // Sample dates in April and May 2025
    const sampleLogs = [
      {
        userId: userId,
        date: new Date("2025-04-15"),
        totalEmissionKg: 25.5,
        activities: [{
          vehicleName: "Test Car 1",
          vehicleType: "Sedan",
          vehicleCategory: "Petrol",
          distanceKm: 50,
          fuelEfficiency: 15,
          emissionKgCO2: 25.5
        }]
      },
      {
        userId: userId,
        date: new Date("2025-04-22"),
        totalEmissionKg: 18.3,
        activities: [{
          vehicleName: "Test Car 1",
          vehicleType: "Sedan",
          vehicleCategory: "Petrol",
          distanceKm: 35,
          fuelEfficiency: 15,
          emissionKgCO2: 18.3
        }]
      },
      {
        userId: userId,
        date: new Date("2025-05-05"),
        totalEmissionKg: 32.7,
        activities: [{
          vehicleName: "Test Car 1",
          vehicleType: "Sedan",
          vehicleCategory: "Petrol",
          distanceKm: 65,
          fuelEfficiency: 15,
          emissionKgCO2: 32.7
        }]
      },
      {
        userId: userId,
        date: new Date("2025-05-18"),
        totalEmissionKg: 15.2,
        activities: [{
          vehicleName: "Test Car 1",
          vehicleType: "Sedan",
          vehicleCategory: "Petrol",
          distanceKm: 30,
          fuelEfficiency: 15,
          emissionKgCO2: 15.2
        }]
      }
    ];

    // Insert the sample logs
    const createdLogs = await EmissionLog.insertMany(sampleLogs);
    
    console.log('Created sample logs:', createdLogs.length);
    
    return res.status(200).json({
      success: true,
      message: 'Sample logs created successfully',
      logs: createdLogs
    });
  } catch (error) {
    console.error('Error creating sample logs:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router; 