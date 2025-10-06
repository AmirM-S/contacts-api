const app = require("./src/app");
const connectDB = require("./src/config/database");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDB();

// برای Vercel
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

// Export برای Vercel
module.exports = app;
