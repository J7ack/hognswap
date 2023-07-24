// Key resources
const express = require('express');
const app = express();
const port = 8000;
const multer = require('multer');
const path = require('path')

app.use(express.json());

// Connection
const { db } = require('./db/conn');

// Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes.js')

// Pass any incoming requests with `/api` to `authRoutes` middleware
app.use('/api', itemRoutes);
app.use('/api', authRoutes);

// Connect to Atlas Cluster
db();

app.listen(port, () => { console.log(`Server started on port ${port}`) });