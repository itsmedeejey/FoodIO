import mongoose from "mongoose"
console.log(process.env.MONGO_URI)
console.log(process.env.PORT)
const connectDB = async () =>
{
    try
    {
        const conn  = await mongoose.connect(process.env.MONGO_URI);
        console.log('Atlas connected');
    }catch(err)
    {
        console.log("there's some error ",err);
        process.exit(1);
    }
} 
export default connectDB;