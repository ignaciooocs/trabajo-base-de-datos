// {
//     "reservation_id": "11",
//     "guest_id": "2",
//     "room_number": "8",
//     "check_in": "2024-07-24",
//     "check_out": "2024-07-26",
//     "status": "completed"
//   }


import { useState } from 'react'
import { insertReservation } from '../../../backend/src/services/fetching'
export function FormReservation () {
    const [reservation_id, setReservation_id] = useState('')
    const [guest_id, setGuest_id] = useState('')
    const [room_number, setRoom_number] = useState('')
    const [check_in, setCheck_in] = useState('')
    const [check_out, setCheck_out] = useState('')
    const [status, setStatus] = useState('')

    async function insertReservationForm (e) {
        e.preventDefault()
        insertReservation({ reservation_id, guest_id, room_number, check_in, check_out, status })
    }

    return (
        <form className="flex flex-col gap-4 border border-gray-300 rounded-md p-2 w-1/2" onSubmit={insertReservationForm}>
            <input className="p-2 border border-gray-300 rounded-md" type="text" placeholder="reservation_id" value={reservation_id} onChange={(e) => setReservation_id(e.target.value)}/>
            <input className="p-2 border border-gray-300 rounded-md" type="text" placeholder="guest_id" value={guest_id} onChange={(e) => setGuest_id(e.target.value)}/>
            <input className="p-2 border border-gray-300 rounded-md" type="text" placeholder="room_number" value={room_number} onChange={(e) => setRoom_number(e.target.value)}/>
            <input className="p-2 border border-gray-300 rounded-md" type="text" placeholder="check_in" value={check_in} onChange={(e) => setCheck_in(e.target.value)}/>
            <input className="p-2 border border-gray-300 rounded-md" type="text" placeholder="check_out" value={check_out} onChange={(e) => setCheck_out(e.target.value)}/>
            <input className="p-2 border border-gray-300 rounded-md" type="text" placeholder="status" value={status} onChange={(e) => setStatus(e.target.value)}/>
            <button className="px-2 bg-blue-400 text-white rounded-md" type="submit">guardar</button>
        </form>
)
}