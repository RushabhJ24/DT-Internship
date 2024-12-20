const { MongoClient, ObjectId } = require('mongodb');
const dbClient = new MongoClient('mongodb://localhost:27017');
const dbName = 'eventsDb';
let db;

// Ensure that the MongoDB connection is established only once
async function connectDB() {
  try {
    if (!db) {
      console.log('Connecting to MongoDB...');
      await dbClient.connect();
      db = dbClient.db(dbName); // Use the database once connected
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Get event by unique ID
async function getEventById(req, res) {
  const { event_id } = req.params;
  console.log('Getting event by ID:', event_id);

  try {
    await connectDB(); // Ensure DB connection is active
    const event = await db.collection('events').findOne({ _id: new ObjectId(event_id) }); // Use new ObjectId()

    if (event) {
      res.json(event);
    } else {
      console.log('Event not found:', event_id);
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Error fetching event', error });
  }
}

// Update event
async function updateEvent(req, res) {
  const { id } = req.params;
  const updatedEvent = req.body;
  console.log('Updating event by ID:', id);

  try {
    await connectDB(); // Ensure DB connection is active
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(id) }, // Use new ObjectId()
      { $set: updatedEvent }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Event updated successfully' });
    } else {
      console.log('Event not found:', id);
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event', error });
  }
}

// Delete event
async function deleteEvent(req, res) {
  const { id } = req.params;
  console.log('Deleting event by ID:', id);

  try {
    await connectDB(); // Ensure DB connection is active
    const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) }); // Use new ObjectId()

    if (result.deletedCount > 0) {
      res.json({ message: 'Event deleted successfully' });
    } else {
      console.log('Event not found:', id);
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event', error });
  }
}



// Get latest events with pagination
async function getLatestEvents(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const pageSize = parseInt(limit);
  const pageNumber = parseInt(page);

  try {
    await connectDB();  // Ensure DB connection is active
    const events = await db.collection('events')
      .find({})
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
}

// Create event
async function createEvent(req, res) {
  const newEvent = req.body;

  try {
    await connectDB();  // Ensure DB connection is active
    const result = await db.collection('events').insertOne(newEvent);

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
}


module.exports = { getEventById, getLatestEvents, createEvent, updateEvent, deleteEvent };
