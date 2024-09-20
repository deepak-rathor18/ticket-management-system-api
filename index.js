const express = require('express');
const dotenv = require('dotenv');
const ticketRoutes = require('./routes/ticketRoutes');
// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Load environment variables
dotenv.config();

// Connect to the database
require('./config/database').connect();

app.get('/', (req, res) => {
  res.send('Welcome to the Ticket Management API');
});

app.use('/api', ticketRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`APP IS LISTENING AT ${PORT}`);
});
