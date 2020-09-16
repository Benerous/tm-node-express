const todoRouter = require('./todo.routes');

module.exports = function(app) {

  app.use('/api/todolist', todoRouter);

  app.use((err, req, res, next) => {
    req.statusCode = err.statusCode || 500;
    res.status(500).send({
      message: err.message || 'Invalid API call',
      statusCode: req.statusCode
    });
  });
}
  