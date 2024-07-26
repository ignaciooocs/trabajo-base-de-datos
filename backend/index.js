import express from 'express'
import cors from 'cors'
import { connectMongo } from './src/database/database.js'
import { roomRoute } from './src/routes/roomRoute.js'
import { guestRoute } from './src/routes/guestRoute.js'
import { reservationRoute } from './src/routes/reservationRoute.js'

const port = 4000 
const app = express()
app.use(express.json())
app.use(cors())
connectMongo()

app.use('/room', roomRoute)
app.use('/guest', guestRoute)
app.use('/reservation', reservationRoute)

app.listen(port, () => {
    console.log('servidor corriendo en el puerto ' + port)
})

