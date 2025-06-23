import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("✅ Database Connected")
  );

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}mern-auth`); // ✅ Add db name here
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  }
};

export default connectDB;
