import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DataBase Connected")
    );
    await mongoose.connect(`${process.env.MONGO_URL}/chat-app`);
  } catch (error) {
    console.log(error);
  }
};
