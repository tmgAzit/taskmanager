const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');
require('dotenv').config();
// middleware
app.use(express.json());

app.use('/api/v1/tasks', tasks);

// routes
// app.get('/hello', (req, res) => {
//   res.send('This is task manager');
// });

// app.get('/api/v1/tasks', tasks); //read/overview tasks
// app.put('/api/v1/tasks', tasks); //create a task
// app.get('/api/v1/tasks/:id', tasks); //get specific(id)
// app.patch('/api/v1/tasks/:id', tasks); //Edit and update specific(id)
// app.delete('/api/v1/tasks/:id', tasks); // Delete specific(id)

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log('Listening the port at: ' + port));
  } catch (error) {
    console.log(error);
  }
};

start();
