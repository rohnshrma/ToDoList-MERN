import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/tdlMERN");
    console.log("Connected to DB", conn.connection.host);
  } catch (err) {
    console.log("Error : ", err);
    process.exit(1);
  }
};

export default connectDB;
