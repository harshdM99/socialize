const mongoose = require('mongoose');

conn_db_url = 'mongodb://127.0.0.1:27017/socialize_development';
async function main() {
    const db = await mongoose.connect(conn_db_url);
    console.log("Connected to database : MongoDB");
    // console.log(db);
    // module.exports = db;
}
main();
module.exports = conn_db_url;

// const db_promise = main();
// module.exports = db_promise;

// module.exports = conn_db_url;

// OLD APPROACH
// main().then(()=> {
//   console.log("Connected to database : MongoDB");

//   const db = mongoose.connection;
    // module.exports = db;  
// }).catch(err => console.log(err));