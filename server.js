import express from 'express';
import mongoose from 'mongoose';
import { urlShort, getOriginalUrl } from './Controllers/url.js';
import dotenv from 'dotenv'; // Import dotenv correctly
import cors from 'cors';

// Initialize dotenv to load environment variables
dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 3001; // Use PORT from environment variables if available

app.use(cors({
  origin: true,
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this to parse JSON bodies

// Set EJS as the templating engine
app.set('view engine', 'ejs');

mongoose
  .connect(process.env.MongoUrl, {
    dbName: 'NodeJS_Express_API_Connection',
  })
  .then(() => console.log('Mongodb Connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

app.get('/', (req, res) => {
  res.render('server', { shortUrl: null }); // Render server.ejs with a default null shortUrl
});

// Handle URL submission
app.post('/shorten', urlShort);

// Redirect to the original URL using the short code
app.get('/:shortCode', getOriginalUrl);

app.listen(port, () => console.log(`Server is running on port ${port}`));
