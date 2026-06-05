export const asyncErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
};