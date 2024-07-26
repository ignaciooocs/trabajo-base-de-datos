import { Schema, model } from "mongoose";

const reservationSchema = new Schema({
    reservation_id: {
        type: String,
        unique: true,
        required: true
    },
    guest_id: {
        type: String,
        required: true,
        ref: 'Guest'
    },
    room_number: {
        type: String,
        required: true,
        ref: 'Room'
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
        required: true
    },
    guest_info: {
        type: Object,
        required: true
    },
    room_info: {
        type: Object,
        required: true
    }
})

export const Reservation = model('Reservation', reservationSchema)