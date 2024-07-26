import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function InputUpdateGuestPhone ({ guest_id }) {
    const queryClient = useQueryClient()

    const [input, setInput] = useState('')
    
    async function updateGuestPhone (e) {
        e.preventDefault()
        try {
            const room = await fetch('http://localhost:4000/guest/update_phone', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guest_id, phone: input })
            })
            const data = await room.json()
            console.log(data)
        } catch (error) {
            console.log('Error al buscar las reservas ' + error)
        } finally {
            setInput('')
            queryClient.invalidateQueries(['guest'])
        }
    } 


    return (
        <section className="flex flex-col gap-4 border border-gray-300 p-2">
            <form className="flex flex-col gap-4" onSubmit={updateGuestPhone}>
                <input className="p-2" type="text" placeholder="phone" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className="px-2 bg-blue-400 text-white rounded-md" type="submit">guardar</button>
            </form>
        </section>
    )
}