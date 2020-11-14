import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

export default connectDB