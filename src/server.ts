import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function server() {
  try {
    await mongoose.connect(config.database_uri as string);

    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();
