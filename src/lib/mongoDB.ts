import mongoose, { ConnectOptions } from "mongoose";

const connectionToDataBase = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error("MongoDB URI is not defined in the environment variables.");
    }


    // const options: ConnectOptions = {
    //   useUnifiedTopology: true,
    // };

    await mongoose.connect(dbUri);

  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database");
  }
};

export default connectionToDataBase;