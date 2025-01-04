import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const DbCon = async () => {
    try {
        await mongoose.connect(process.env.URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('Mongodb is connected');
    } catch (error) {
        console.log("Error in mongodb connection", error);
    }
}

export default DbCon;
