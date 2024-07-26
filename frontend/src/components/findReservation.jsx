import { useState } from "react"
import { fetchReservations, fetchReservationsActive, fetchReservationsActiveRange, fetchReservationsWithService } from "../../../backend/src/services/fetching"
import { ReservationInfo } from "./ReservationInfo"
import { FormReservation } from "./formReservation"

export function FindReservations() {
    const [reservations, setReservations] = useState(false)
    const [date, setDate] = useState({
        date1: '',
        date2: ''
    })
    const [service, setService] = useState('')

    async function getReservations() {
        const response = await fetchReservations()
        setReservations(response)
    }

    async function getReservationsActive() {
        const response = await fetchReservationsActive()
        setReservations(response)
    }

    async function getReservationsActiveRange(e) {
        e.preventDefault()
        const response = await fetchReservationsActiveRange(date)
        setReservations(response)
    }

    async function getReservationsWithService(e) {
        e.preventDefault()
        const response = await fetchReservationsWithService({service})
        setReservations(response)
    }

    return (
        <section className="flex flex-col w-full items-center gap-8">
            <FormReservation />
            <div className="flex flex-col gap-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" onClick={getReservations}>Mostrar todas</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" onClick={getReservationsActive}>Mostrar activas</button>
                <form onSubmit={getReservationsActiveRange}>
                    <input type="date" onChange={(e) => setDate({ ...date, date1: e.target.value })} />
                    <input type="date" onChange={(e) => setDate({ ...date, date2: e.target.value })} />
                    <button className="px-2 bg-blue-400 text-white rounded-md" type="submit">Buscar</button>
                </form>
                <form onSubmit={getReservationsWithService}>
                    <input type="text" placeholder="service" onChange={(e) => setService(e.target.value)} />
                    <button className="px-2 bg-blue-400 text-white rounded-md" type="submit">Buscar</button>
                </form>
            </div>
            <ul className="flex flex-col w-full items-center gap-8">
                {reservations && 
                    reservations.map(reservation => 
                        <ReservationInfo  key={reservation.reservation_id} reservation={reservation} />
                    )}
            </ul>
        </section>
    )
}
