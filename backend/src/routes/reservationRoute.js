import express from 'express'
import { Reservation } from '../models/reservation.js'
import { Guest } from '../models/guest.js'
import { Room } from '../models/room.js'

export const reservationRoute = express.Router()

reservationRoute.post('/insertone', async (req, res) => {
    const { reservation_id, guest_id, room_number, check_in, check_out, status } = req.body
    try {
        const reserva = new Reservation({
            reservation_id,
            guest_id,
            room_number,
            check_in: new Date(check_in),
            check_out: new Date(check_out),
            status
        })

        const guest = await Guest.findOne({guest_id})
        const room = await Room.findOne({room_number})
        
        reserva.guest_info = guest ? guest : null
        reserva.room_info = room ? room : null

        const savedReservation = await reserva.save()
        res.json(savedReservation)
    } catch (error) {
        console.log('Error al insertar la reserva ' + error)
    }
})

reservationRoute.get('/find', async (req, res) => {
    try {
        const reservations = await Reservation.find()
        res.json(reservations)
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
})

reservationRoute.delete('/deleteone', async (req, res) => {
    const { reservation_id } = req.body
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(reservation_id)
        res.json(deletedReservation)
    } catch (error) {
        console.log('Error al borrar la reserva ' + error)
    }
})

// Consulta todas las reservas activas (status = "active").
reservationRoute.get('/find_active', async (req, res) => {
    try {
        const rooms = await Reservation.find({status: 'active'})
        res.json(rooms)  
    } catch (error) {
        console.log('Error al buscar las habitaciones')
    }
})

// Consulta la información detallada de una reserva específica usando su reservation_id.
reservationRoute.get('/find/:reservation_id', async (req, res) => {
    const { reservation_id } = req.params
    try {
        const reservation = await Reservation.findOne({ reservation_id })
        if (!reservation) return res.status(404).json({ message: "reserva no encontrada" })
        res.json(reservation)
    } catch (error) {
        console.log('Error al buscar la reserva ' + error)
    }
})

// Consulta todas las reservas de un huésped específico usando su guest_id
reservationRoute.get("/guest/:guest_id", async (req, res) => {
    const { guest_id } = req.params
    try {
        const reservations = await Reservation.find({ guest_id: guest_id })
        if (reservations.length === 0) return res.status(404).json({ message: "reservas de huesped no encontradas" })
        res.json(reservations)
    } catch (error) {
        console.log('Error al buscar las reservas del huesped ' + error)
    }
})

// oConsulta reservas activas en un rango de fechas (por ejemplo, entre "2024-07-01" y "2024-07-10").
reservationRoute.get('/find_active_range', async (req, res) => {
    const date1 = req.query.date1
    const date2 = req.query.date2
    try {
        const rooms = await Reservation.find({status: 'active', check_in: { $gte: new Date(date1), $lte: new Date(date2) }})
        res.json(rooms)  
    } catch (error) {
        console.log('Error al buscar las habitaciones')
    }
})

// Incluye un documento anidado con la información del huésped (guest_info) y de la habitación (room_info) en cada reserva.
reservationRoute.get('/find_with_info', async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('guest_info room_info')
        res.json(reservations)
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
})

// Buscar reservas que incluyan habitaciones con un servicio específico (por ejemplo, room_info.services = "WiFi").
reservationRoute.get('/find_with_services', async (req, res) => {
    const service = req.query.service
    try {
        const reservations = await Reservation.find({ 'room_info.services': service })
        res.json(reservations)
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
})

//Buscar huéspedes que hayan reservado múltiples habitaciones (más de una reserva).
reservationRoute.get('/find_multiple_rooms', async (req, res) => {
    try {
        const guests = await Reservation.aggregate([
            {
                $group: {
                    _id: "$guest_id",
                    reservationCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    reservationCount: { $gt: 1 }
                }
            },
            {
                $lookup: {
                    from: 'guests',
                    localField: '_id',
                    foreignField: 'guest_id',
                    as: 'guest_info'
                }
            },
            {
                $unwind: "$guest_info"
            },
            {
                $project: {
                    guest_id: "$_id",
                    reservationCount: 1,
                    guest_info: 1
                }
            }
        ]);

        res.json(guests);
    } catch (error) {
        console.error('Error finding guests with multiple reservations:', error);
        throw error;
    }
})