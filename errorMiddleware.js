//2 middleware function lera drwstakain yakekian bo away catch'y awa bka ka exist nabe
//dwamishyan bo catch'y any error that accur in our route

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      statusCode = 404;
      message = 'Resource not found';
    }
  
    res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
  };
  
  export { notFound, errorHandler };
  