const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const eventRoutes = require('./routes/eventRoutes');  // Ensure this is the correct path

// Middleware to parse JSON bodies
app.use(bodyParser.json());  // or app.use(express.json());

// Use the event routes
app.use('/api/v3/app', eventRoutes);  // This tells Express to use eventRoutes for any /api/v3/app/ paths

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
