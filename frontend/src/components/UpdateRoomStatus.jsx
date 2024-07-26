import { useState } from "react"

export function InputUpdateRoomStatus ({ room_number }) {

    const [input, setInput] = useState('')
    
    async function updateRoomStatus (e) {
        e.preventDefault()
        try {
            const room = await fetch('http://localhost:4000/room/update_status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ room_number, status: input })
            })
            const data = await room.json()
            console.log(data)
        } catch (error) {
            console.log('Error al buscar las reservas ' + error)
        } finally {
            setInput('')
        }
    } 


    return (
        <section className="flex flex-col gap-4 border border-gray-300 p-2">
            <form className="flex flex-col gap-4" onSubmit={updateRoomStatus}>
                <input className="p-2" type="text" placeholder="estado" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className="px-2 bg-blue-400 text-white rounded-md" type="submit">guardar</button>
            </form>
        </section>
    )
}