import "dotenv/config";
import connectDB from "./app/db/config.js";
import app from "./app/index.js";

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
