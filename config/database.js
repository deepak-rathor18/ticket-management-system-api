const mongoose = require("mongoose");

require("dotenv").config();

exports.connect =()=>{
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true, // no longer needed
    // useUnifiedTopology: true // no longer needed
  })
.then(()=>{console.log("DB Connected successfully")})
.catch((err)=>{
    console.log("DB CONNECTION ISSUES");
    console.error(err);
    process.exit(1);
})
}