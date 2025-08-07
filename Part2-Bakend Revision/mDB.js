const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://savigurjar:Hunter12@cluster0.rapodec.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = "OnePiece";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("revis");

  // the following code examples can be pasted here...
//   const findResult = await collection.find({}).toArray();
//   console.log("Found documents =>", findResult);

// const filteredDocs = await collection.find({ age: 19 }).toArray();
// console.log('Found documents filtered by { age: 19 } =>', filteredDocs);

// const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
// console.log('Inserted documents =>', insertResult);

const deleteResult = await collection.deleteMany([{ a: 1 }, { a: 2 }]);
console.log('Deleted documents =>', deleteResult);
  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
