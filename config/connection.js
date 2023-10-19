const { connect, connection } = require('mongoose');

connect(process.env.MONGO_URI ||'mongodb://localhost/dogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;