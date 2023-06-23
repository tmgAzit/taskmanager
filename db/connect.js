const mongoose = require('mongoose');

// const connectionString = `mongodb+srv://ajit:ELbEFIyRZ1cC7Gzg@cluster0.vrclx.mongodb.net/task-manager?retryWrites=true&w=majority`;

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
