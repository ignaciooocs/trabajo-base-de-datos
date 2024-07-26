export function RoomInfo ({ room }) {

    if (!room) {
        return <li className="w-3/4 flex flex-col gap-4 border border-gray-300 p-2">No hay habitaciones</li>
    }
    return (
        <li className="w-3/4 flex flex-col gap-4 border border-gray-300 p-2">
            <p><b>numero de habitacion:</b> {room.room_number}</p>
            <p><b>precio:</b> ${room.price}</p>
            <p><b>estado:</b> <span className={`${room.status === 'available' ? 'text-green-500' : 'text-red-500'} font-bold`}>{room.status}</span></p>
            <p><b>tipo:</b> {room.type}</p>
            <b>servicios:</b>
            <ul>
                {room.services.map(service => <li key={service}>{service}</li>)}
            </ul>
        </li>
    )
}