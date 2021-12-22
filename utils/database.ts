import mongoose, { Model } from "mongoose"

const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  // SCHEMA
  const schema = new mongoose.Schema({
    name: String,
    age: String,
    color: String
  })


  const Flamingos = mongoose.models.Flamingo || mongoose.model("Flamingo", schema);

  return { conn, Flamingos }
}