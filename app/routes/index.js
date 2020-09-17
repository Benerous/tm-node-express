const todoRouter = require('./todo.routes');

module.exports = function(app) {

  app.use('/api/todolist', todoRouter);

  app.use((req, res, next) => {
    let err = new Error('Invalid API Request');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    req.statusCode = err.status || 500;
    res.status(req.statusCode).send({
      message: err.message || err.errors,
      statusCode: req.statusCode
    });
  });
}
  