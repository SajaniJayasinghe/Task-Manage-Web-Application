import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URL;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  await mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export { connectDB };
