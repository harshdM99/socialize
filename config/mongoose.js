const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/socialize_development');
}

main().then(()=> {
  console.log("Connected to database : MongoDB");

  const db = mongoose.connection;
  module.exports = db;
}).catch(err => console.log(err));