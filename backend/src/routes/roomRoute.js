import express from 'express'
import { Room } from '../models/room.js'

export const roomRoute = express.Router()

// crear un array de 10 habitaciones
const rooms = [
    {room_number: 1, type: 'single', price: 100, status: 'available', services: ['wifi']},
    {room_number: 2, type: 'double', price: 200, status: 'available', services: ['wifi', 'kitchen', 'balcony', 'air-conditioner']},
    {room_number: 3, type: 'suite', price: 300, status: 'available', services: ['kitchen', 'TV', 'air-conditioner', 'jacuzzi']},
    {room_number: 4, type: 'single', price: 100, status: 'available', services: ['wifi']},
    {room_number: 5, type: 'double', price: 200, status: 'available', services: ['wifi', 'Netflix', 'jacuzzi']},
    {room_number: 6, type: 'suite', price: 300, status: 'available', services: ['wifi', 'kitchen', 'TV', 'air-conditioner', 'balcony', 'jacuzzi']},
    {room_number: 7, type: 'single', price: 100, status: 'available', services: ['wifi']},
    {room_number: 8, type: 'double', price: 200, status: 'available', services: ['wifi', 'kitchen', 'air-conditioner']},
    {room_number: 9, type: 'suite', price: 300, status: 'available', services: ['wifi', 'kitchen', 'TV', 'air-conditioner', 'balcony', 'jacuzzi']},
    {room_number: 10, type: 'single', price: 100, status: 'available', services: ['wifi']},
    {room_number: 60, type: 'double', price: 200, status: 'available', services: ['wifi', 'kitchen', 'air-conditioner']},
    {room_number: 100, type: 'suite', price: 300, status: 'available', services: ['wifi', 'kitchen', 'TV', 'air-conditioner', 'balcony', 'jacuzzi']}
]

roomRoute.post('/insert', async (req, res) => {
    try {
        rooms.forEach(async (room) => {
            const newRoom = new Room(room)
            await newRoom.save()
        })

        res.json({rooms})
    } catch (error) {
        console.log('Error al insertar las habitaciones')
    }
    
})

roomRoute.get('/find', async (req, res) => {
    try {
        const rooms = await Room.find()
        res.json(rooms)  
    } catch (error) {
        console.log('Error al buscar las habitaciones')
    }
})

roomRoute.put('/update_status', async (req, res) => {
    const { room_number, status } = req.body
    try {
        const room = await Room.updateOne({room_number}, {status})
        res.json(room)
    } catch (error) {
        console.log('Error al actualizar el estado de las habitaciones ' + error)
    }
})

// Consulta todas las habitaciones disponibles (status = "available").
roomRoute.get('/find_available', async (req, res) => {
    try {
        const rooms = await Room.find({status: 'available'})
        res.json(rooms)  
    } catch (error) {
        console.log('Error al buscar las habitaciones')
    }
})

// Consulta habitaciones disponibles en un rango de precios (por ejemplo, entre 50 y 150).
roomRoute.get('/find_available_range', async (req, res) => {
    const range_1 = req.query.range_1
    const range_2 = req.query.range_2
    try {
        const rooms = await Room.find({price: { $gte: range_1, $lte: range_2 }})
        res.json(rooms)  
    } catch (error) {
        console.log('Error al buscar las habitaciones')
    }
})

// Incluye un arreglo de servicios disponibles en cada habitación (por ejemplo, services: ["WiFi", "TV", "Aire acondicionado"]).
roomRoute.put('/update_services', async (req, res) => {
    const { room_number, services } = req.body
    try {
        const room = await Room.updateOne({room_number}, {services})
        res.json(room)
    } catch (error) {
        console.log('Error al actualizar los servicios de las habitaciones ' + error)
    }
})

// Actualizar la información de un servicio específico en una habitación (por ejemplo, cambiar "WiFi" por "High-Speed WiFi").
roomRoute.put('/update_service', async (req, res) => {
    const { room_number, service, newService } = req.body;
    try {
        const room = await Room.updateOne(
            { room_number, services: service },
            { $set: { "services.$": newService } }
        );
        res.json(room);
    } catch (error) {
        console.log('Error al actualizar el servicio de las habitaciones: ' + error);
        res.status(500).json({ error: 'Error al actualizar el servicio de las habitaciones' });
    }
});

// oBuscar habitaciones que tengan un conjunto específico de servicios (por ejemplo, services: ["WiFi", "TV"]).
roomRoute.post('/find_with_services', async (req, res) => {
    const { services } = req.body
    try {
        const rooms = await Room.find({ services: { $all: services } })
        res.json(rooms)
    } catch (error) {
        console.log('Error al buscar las habitaciones ' + error)
    }
})