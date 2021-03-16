import mongoose from "mongoose";

export const MONGO_URI =
  process.env.MONGO_DATABASE_URL ||
  `mongodb+srv://admin:Aa123456@cluster0.0ufnp.mongodb.net/todoExercise?retryWrites=true&w=majority`;

export const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectMongoDb = async () => {
  try {
    mongoose.connect(MONGO_URI, mongoOptions);
    console.log("Connected to Mongo database");
  } catch (error) {
    console.log(error.message);
  }
};
