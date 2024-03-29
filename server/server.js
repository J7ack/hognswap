// Key resources
const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json({ limit: 
'1mb' }));

// Parse cookies  
app.use(cookieParser());

// Middleware for token to request obj
app.use((req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;
  console.log('Token received:', token);

  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'the_secret_key')
      req.user = { email: decodedToken.email };
      console.log('Decoded token: ', decodedToken);

    } catch (error) {
      console.log('Failed to verify token:', err);
    }
  }
  next();
})

// Connection
const { db } = require('./db/conn');

// Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes.js');
const authMiddleware = require('./routes/serverAuthRoutes');

// Pass any incoming requests with `/api` to `authRoutes` middleware
app.use('/api/protected', authMiddleware, itemRoutes);
app.use('/api', authRoutes);

// Connect to Atlas Cluster
db();

app.listen(port, () => { console.log(`Server started on port ${port}`) });