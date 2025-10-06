module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  let status = err.status || 500;
  let message = err.message || "خطای سرور";

  const payload = { success: false, message };
  if (process.env.NODE_ENV === "development") payload.stack = err.stack;

  res.status(status).json(payload);
};