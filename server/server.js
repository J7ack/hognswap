// Key resources
const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

// Connection
const { db } = require('./db/conn');

// Routes
const authRoutes = require('./routes/authRoutes');

// Use authRoutes as middleware
app.use('/api', authRoutes);


// Connect to Atlas Cluster
db();

app.listen(port, () => { console.log(`Server started on port ${port}`) });
