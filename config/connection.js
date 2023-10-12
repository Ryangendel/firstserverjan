const { connect, connection } = require('mongoose');

connect('mongodb://localhost/dogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;