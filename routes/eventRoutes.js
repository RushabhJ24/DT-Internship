const express = require('express');
const router = express.Router();
const {
  getEventById,
  getLatestEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

// Get event by unique ID
router.get('/events/:event_id', getEventById);  // Using :event_id

// Get latest events with pagination
router.get('/events', getLatestEvents);

// POST to create an event
router.post('/events', createEvent);

// Update event by ID
router.put('/events/:id', updateEvent);  // Using :id

// Delete event by ID
router.delete('/events/:id', deleteEvent);  // Using :id

module.exports = router;
