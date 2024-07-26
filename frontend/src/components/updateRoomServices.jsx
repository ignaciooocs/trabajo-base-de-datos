import { useState } from "react"
import { updateRoomsServices } from "../../../backend/src/services/fetching"

export function InputUpdateRoomServices ({ room_number }) {

    const [input, setInput] = useState('')
    
    async function updateRoomStatus (e) {
        e.preventDefault()

        updateRoomsServices({room_number, services: input.split(' ')})
    } 


    return (
        <section className="flex flex-col gap-4 border border-gray-300 p-2">
            <form className="flex flex-col gap-4" onSubmit={updateRoomStatus}>
                <input className="p-2" type="text" placeholder="services" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className="px-2 bg-blue-400 text-white rounded-md" type="submit">guardar</button>
            </form>
        </section>
    )
}