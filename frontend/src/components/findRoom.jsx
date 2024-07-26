import { useState } from "react"
import { RoomInfo } from "./RoomInfo"
import { fetchrooms, fetchroomsActive, fetchroomsAvailableRange, fetchRoomsWithServices } from "../../../backend/src/services/fetching"
import { InputUpdateRoomStatus } from "./UpdateRoomStatus"
import { InputUpdateRoomServices } from "./updateRoomServices"
import { InputUpdateOneService } from "./UpdateOneService"

export function FindRoom () {
    const [status, setStatus] = useState(false)
    const [range, setRange] = useState({
        range_1: 0,
        range_2: 0
    })
    const [rooms, setRooms] = useState([])
    const [services, setServices] = useState('')

    const getRooms = async () => {
        const response = await fetchrooms()
        setRooms(response)
    }

    const getActiveRooms = async () => {
        const response = await fetchroomsActive()
        setRooms(response)
    }

    const getRoomsAvailableRange = async (e) => {
        e.preventDefault()
        console.log(range)
        const response = await fetchroomsAvailableRange(range)
        setRooms(response)
    }

    const getReservationsWithService = async (e) => {
        e.preventDefault()
        console.log(services.split(' '))
        const response = await fetchRoomsWithServices({ services: services.split(' ') })
        setRooms(response)
    }


    return (
        <section className="flex flex-col w-full items-center gap-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" onClick={getRooms}>mostrar todas</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" onClick={getActiveRooms}>mostrar activas</button>
            <form onSubmit={getRoomsAvailableRange}>
                <input type="number" placeholder="range_1" onChange={(e) => setRange({ ...range, range_1: e.target.value })} />
                <input type="number" placeholder="range_2" onChange={(e) => setRange({ ...range, range_2: e.target.value })} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">mostrar por rango</button>
            </form>
            <form onSubmit={getReservationsWithService}>
                <input type="text" placeholder="services" onChange={(e) => setServices(e.target.value)} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">mostrar con servicio</button>
            </form>
            <ul className="flex flex-col w-full items-center">
                {rooms && 
                    rooms.map(room =>
                        <div className="w-3/4 flex" key={room.room_number}>
                            <RoomInfo key={room._id} room={room} />
                            <section className="flex flex-col gap-4 border border-gray-300 p-2">
                                <button onClick={() => setStatus(!status)}>editar</button>
                                {status && <InputUpdateRoomStatus room_number={room.room_number} />}
                                {status && <InputUpdateRoomServices room_number={room.room_number} />}
                                {status && <InputUpdateOneService room_number={room.room_number} />}
                            </section>
                        </div>)
                }
            </ul>
        </section>
    )
}

