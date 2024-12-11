const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: In Connecting the database`);
    process.exit(1); 
  }
};

module.exports = connectDB;
//  Done with the backend server 