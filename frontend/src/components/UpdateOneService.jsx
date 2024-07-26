import { useState } from "react"
import { updateRoomService } from "../../../backend/src/services/fetching"

export function InputUpdateOneService ({ room_number }) {

    const [input, setInput] = useState({
        service: '',
        newService: ''
    })
    
    async function updateRoom (e) {
        e.preventDefault()

        updateRoomService({room_number, service: input.service, newService: input.newService})
    } 


    return (
        <section className="flex flex-col gap-4 border border-gray-300 p-2">
            <form className="flex flex-col gap-4" onSubmit={updateRoom}>
                <input className="p-2" type="text" placeholder="service" value={input.service} onChange={(e) => setInput({...input, service: e.target.value})} />
                <input className="p-2" type="text" placeholder="newService" value={input.newService} onChange={(e) => setInput({...input, newService: e.target.value})} />
                <button className="px-2 bg-blue-400 text-white rounded-md" type="submit">guardar</button>
            </form>
        </section>
    )
}