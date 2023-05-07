import mongoose from 'mongoose'

const connectDB = async url => {
  mongoose.set('strictQuery', true)
  await mongoose
    .connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))
}
//OPENAI_API_KEY = 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
export default connectDB
