const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const userRoutes = require('./routes/users');
const emissionLogRoutes = require('./routes/emissionLog');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
let firebaseApp;
try {
  if (process.env.NODE_ENV === 'production') {
    // For production (Render), use environment variables
    const serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: "googleapis.com"
    };
    
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    // For local development, use the JSON file
    const serviceAccount = require('./serviceAccountKey.json');
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
  process.exit(1); // Exit if Firebase initialization fails
}

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'https://ecofootprint-frontend.vercel.app',
    'https://ecofootprint-frontend-git-main-ecofootprint-frontend.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/emission-log', emissionLogRoutes);
app.use('/api', emissionLogRoutes); // For /api/leaderboard
app.use('/api/auth', authRoutes);

// Legacy vehicle route for backward compatibility
app.post('/api/vehicle', async (req, res) => {
  try {
    const { vehicleType, fuelEfficiency, distance } = req.body;
    
    // Emission factors in kg CO2 per liter or kWh
    const emissionFactors = {
      Petrol: 2.31,    // kg CO2 per liter
      Diesel: 2.68,
      CNG: 1.6,
      Electric: 0.05,  // kg CO2 per kWh
    };

    const factor = emissionFactors[vehicleType] || 0;
    if (fuelEfficiency <= 0) {
      return res.status(400).json({ error: 'Invalid fuel efficiency' });
    }

    // Calculate fuel consumed
    const fuelConsumed = distance / fuelEfficiency;
    // Calculate emission
    const emission = Number((fuelConsumed * factor).toFixed(2));

    res.json({ emission });
  } catch (error) {
    console.error('Error calculating emission:', error);
    res.status(500).json({ error: 'Error calculating emission' });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecofootprint')
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Collections:', Object.keys(mongoose.connection.collections));
    
    // Log all collections and their document counts
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
        return;
      }
      collections.forEach(collection => {
        mongoose.connection.db.collection(collection.name).countDocuments()
          .then(count => {
            console.log(`Collection '${collection.name}' has ${count} documents`);
          })
          .catch(err => {
            console.error(`Error counting documents in ${collection.name}:`, err);
          });
      });
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Log MongoDB connection status
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'EcoFootprint API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 