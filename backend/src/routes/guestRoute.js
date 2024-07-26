import express from "express";
import { Guest } from "../models/guest.js";

export const guestRoute = express.Router();

const guests = [
    { guest_id: "1", name: "John", email: "john@email.com", phone: "123-456-7890", address: "123 Main St, Anytown, USA" },
    { guest_id: "2", name: "Jane", email: "jane@email.com", phone: "123-456-7890", address: "123 Main St, Anytown, USA" },
    { guest_id: "3", name: "Bob", email: "bob@email.com", phone: "123-456-7890", address: "123 Main St, Anytown, USA" },
    { guest_id: "4", name: "Alice", email: "alice@email.com", phone: "123-456-7890", address: "123 Main St, Anytown, USA" },
    { guest_id: "5", name: "Mike", email: "mike@email.com", phone: "123-456-7890", address: "123 Main St, Anytown, USA" },
]

guestRoute.post("/insert", async (req, res) => {
    try {
        guests.forEach(async (guest) => {
            const newGuest = new Guest(guest)
            await newGuest.save()
        })
        res.json({ guests }); 
    } catch (error) {
        console.log('Error al insertar los huespedes')
    }
})


guestRoute.get("/find", async (req, res) => {
    try {
        const guests = await Guest.find()
        res.json(guests)    
    } catch (error) {
        console.log('Error al buscar los huespedes')
    }
})

guestRoute.put("/update_phone", async (req, res) => {
    const { guest_id, phone } = req.body

    console.log(guest_id, phone)
    try {
        const guest = await Guest.updateOne({guest_id: guest_id}, {phone: phone})
        res.json(guest)
    } catch (error) {
        console.log('Error al actualizar el telefono del huesped ' + error)
    }
})



