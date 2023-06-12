const express = require("express");
const app = express();
const port = 8000;

// app.use("/", require("./routes/index"));
// Default is index so we can only give the directory
app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function(err){
    if(err){
        console.error(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});