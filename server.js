import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
let port = process.env.PORT || 3001; // Use the PORT provided by Render or default to 3000

const mongoUri = process.env.MongoUrl;

if (!mongoUri) {
  throw new Error('MongoDB connection URI is missing in the environment variables.');
}

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds timeout
    socketTimeoutMS: 45000,  // 45 seconds socket timeout
  })
  .then(() => console.log('Mongodb Connected'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  });

// Example route
app.get('/', (req, res) => {
  res.send('Hello from URL Shortener!');
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle server errors, including EADDRINUSE
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use, trying another port...`);
    port++;
    server.listen(port);
  } else {
    console.error(`Server error: ${err.message}`);
  }
});
