import mongoose from "mongoose";

export async function connectMongo () {
    try {
        await mongoose.connect('mongodb://localhost:27017/hotel_management')
        console.log('database connected')
    } catch (error) {
        console.log('error database')
    }
}
