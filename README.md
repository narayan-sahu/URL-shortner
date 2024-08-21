# URL Shortener

An URL shortener application built with Node.js, Express, and MongoDB. This project allows users to shorten long URLs and redirect to the original URL using the shortened version.

## Features

- Shorten long URLs
- Redirect to original URLs using the shortened URL
- Simple and clean user interface
- Environment-based configuration

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Environment Configuration:** dotenv

## Live Demo

Check out the live deployment of the URL Shortener: [https://url-shortner-d80u.onrender.com](https://url-shortner-d80u.onrender.com)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- MongoDB server or MongoDB Atlas account
- Git installed on your machine

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
MongoUrl="mongodb+srv://username:password@cluster0.mongodb.net/yourdbname?retryWrites=true&w=majority"
PORT=3000
```

### 4. Run the Application
```bash
npm start
```

## Project Structure
```bash
.
├── Controllers
│   └── url.js              # URL shortener logic
├── Models
│   └── Url.js              # Mongoose schema for storing URLs
├── Views
│   └── server.ejs          # EJS template for the frontend
├── .env                    # Environment variables
├── .gitignore              # Ignored files and directories
├── package.json            # Node.js dependencies and scripts
├── server.js               # Main application file
└── README.md               # Project documentation
```

## API Endpoints
#### Request Body:
```bash
{
  "longUrl": "https://www.example.com"
}
```

#### Response:
```bash
{
  "shortUrl": "http://localhost:3000/abc123"
}
```


## Acknowledgements
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Render](https://render.com/)
