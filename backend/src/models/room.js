import { Schema, model } from "mongoose";

const roomSchema = new Schema({
    room_number: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ['single', 'double', 'suite'],
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    status: {
        type: String,
        enum: ['available', 'occupied'],
        default: 'available',
        required: true
    },
    services: {
        type: [String],
        default: [],
        required: true
    }
})

export const Room = model('Room', roomSchema)
