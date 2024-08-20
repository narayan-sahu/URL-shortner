import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { urlShort, getOriginalUrl } from './controllers/url.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: true,
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

// Mongoose connection with increased timeout
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: 'NodeJS_Express_API_Connection',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,  // 30 seconds timeout
    socketTimeoutMS: 45000,   // 45 seconds socket timeout
  })
  .then(() => console.log('Mongodb Connected'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  });

app.get('/', (req, res) => {
  res.render('server', { shortUrl: null });
});

app.post('/shorten', urlShort);

app.get('/:shortCode', getOriginalUrl);

app.listen(port, () => console.log(`Server is running on port ${port}`));
