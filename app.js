const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');
require('dotenv').config();
const notFound = require('./middleware/notfound.js');
const errorHandlerMiddleware = require('./middleware/errorHandler.js');
// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

// routes
// app.get('/hello', (req, res) => {
//   res.send('This is task manager');
// });

// app.get('/api/v1/tasks', tasks); //read/overview tasks
// app.put('/api/v1/tasks', tasks); //create a task
// app.get('/api/v1/tasks/:id', tasks); //get specific(id)
// app.patch('/api/v1/tasks/:id', tasks); //Edit and update specific(id)
// app.delete('/api/v1/tasks/:id', tasks); // Delete specific(id)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log('Listening the port at: ' + port));
  } catch (error) {
    console.log(error);
  }
};

start();
