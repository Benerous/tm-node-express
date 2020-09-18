const app = require('express')();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app.use(bodyParser.json());

require('./routes')(app);

mongoose
  .connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .catch(err => {
    console.log(err.reason);
  });

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

if (app.settings.env === 'test') server.close();

module.exports = app;