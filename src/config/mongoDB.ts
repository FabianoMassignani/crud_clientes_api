import { connect } from "mongoose";
import { MONGO_URI, MONGO_URI_TEST } from "./secrets";

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      await connect(MONGO_URI_TEST);
      console.log("MongoDB conectado com sucesso no teste!");
      return;
    }

    await connect(MONGO_URI);
    console.log("MongoDB conectado com sucesso no dev!");
    return;
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
