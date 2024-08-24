import { kv } from "../src/index";
import dotenv from "dotenv";

// Load environment variables. Depending on your setup, you may need to adjust/remove this.
dotenv.config();

// Load environment variables for use
const ACCOUNT_ID = process.env.ACCOUNT_ID ?? "";
const AUTH_TOKEN = process.env.AUTH_TOKEN ?? "";
const NAMESPACE_ID = process.env.NAMESPACE_ID ?? "";

// We try to save a value of "world" to the key "hello"
const saveHelloWorld = async () => {
  const response = await kv.write({
    accountId: ACCOUNT_ID,
    authToken: AUTH_TOKEN,
    namespaceId: NAMESPACE_ID,

    keyName: "hello", // key
    value: "world", // value
    metadata: { a: "b" }, // metadata is required, but can be filled with any object
  });

  // Check if the write was successful
  const status = response.status === 200;
  if (status) {
    console.log("Successfully saved 'world' to 'hello'");
  } else {
    console.error("Failed to save 'world' to 'hello'");
  }
};

// We try to read the value of key "hello"
const readHelloWorld = async () => {
  const response = await kv.read({
    accountId: ACCOUNT_ID,
    authToken: AUTH_TOKEN,
    namespaceId: NAMESPACE_ID,

    keyName: "hello", // key
  });

  // Check if the read was successful
  const status = response.status === 200;
  if (status) {
    console.log("Successfully read 'hello':", response.data);
  } else {
    console.error("Failed to read 'hello'");
  }
};

// Run the functions
const main = async () => {
  await saveHelloWorld();
  await readHelloWorld();
};

main();
