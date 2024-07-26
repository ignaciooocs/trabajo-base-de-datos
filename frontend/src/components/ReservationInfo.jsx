import { NavLink } from "react-router-dom";
import { GuestInfo } from "./GuestInfo";
import { RoomInfo } from "./RoomInfo";

export function ReservationInfo ({ reservation }) {

    async function deleteReservation(reservation_id) {
        try {
            await fetch(`http://localhost:4000/reservation/deleteone`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reservation_id }),
            })
        } catch (error) {
            console.log('Error al borrar la reserva ' + error)
        } finally {
            queryClient.invalidateQueries(['reservations'])
        }
    }

    return (
        <NavLink to={`/reservation/${reservation.reservation_id}`} className="w-1/2 flex flex-col gap-4 border border-gray-300 p-2" key={reservation.reservation_id}>
            <button 
                onClick={() => deleteReservation(reservation._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded">Eliminar</button>
            <p><b>id: </b>{reservation.reservation_id}</p>
            <p><b>estado: </b>{reservation.status}</p>
            <p><b>id huesped: </b> {reservation.guest_id}</p>
            <p><b>numero de habitación: </b> {reservation.room_number}</p>
            <p><b>fecha entrada: </b> {reservation.check_in}</p>
            <p><b>fecha salida: </b> {reservation.check_out}</p>
            <b>informacion de huesped</b>
            <GuestInfo guest={reservation.guest_info}/>
            <b>informacion de habitación</b>
            <RoomInfo room={reservation.room_info}/>
        </NavLink>
    )
}