import { useState } from "react"
import { ReservationInfo } from "./ReservationInfo"

export function GuestInfo ({ guest }) {
    const [reservations, setReservations] = useState(false)
    const [view, setView] = useState(false)

    async function getReservations() {
        const response = await fetch(`http://localhost:4000/reservation/guest/${guest.guest_id}`)
        const data = await response.json()
        console.log(data)
        setReservations(data)
        setView(!view)
    }

    return (
        <li className="w-3/4 flex flex-col gap-4 border border-gray-300 p-2">
            <p><b>id:</b> {guest.guest_id}</p>
            <p><b>nombre:</b> ${guest.name}</p>
            <p><b>email:</b> {guest.email}</p>
            <p><b>telefono:</b> {guest.phone}</p>
            <p><b>direccion:</b> {guest.address}</p>
           {guest.reservationCount && <p><b>reservas:</b>{guest.reservationCount }</p>}
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={getReservations}>ver reservas</button>
            <ul>
                {(reservations && reservations.length > 0 && view) 
                    && reservations.map(reservation => <ReservationInfo key={reservation.reservation_id} reservation={reservation}/>)   
                }
            </ul>
        </li>
    )
}