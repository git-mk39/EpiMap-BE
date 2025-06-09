import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

async function main() {
  dotenv.config();
  const client = new mongodb.MongoClient(process.env.DB_URI);
  const port = process.env.PORT || 5000;

  try {
    await client.connect();
    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);
