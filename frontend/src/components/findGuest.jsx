import { fetchguest, fetchguestsMultipleRooms } from "../../../backend/src/services/fetching"
import { GuestInfo } from "./GuestInfo"
import { InputUpdateGuestPhone } from "./updateGuestPhone"
import { useState } from "react"

export function Findguest () {
    const [status, setStatus] = useState(false)
    const [guests, setGuests] = useState([])

    async function getGuests() {
        const response = await fetchguest()
        setGuests(response)
    }

    async function getGuestsMultipleRooms() {
        // Llamada al servicio que retorna los datos
        const response = await fetchguestsMultipleRooms();
        
        // Transformar los datos
        const data = response.map(guest => {
            return {
                _id: guest.guest_info._id,
                guest_id: guest.guest_info.guest_id,
                name: guest.guest_info.name,
                email: guest.guest_info.email,
                phone: guest.guest_info.phone,
                address: guest.guest_info.address,
                __v: guest.guest_info.__v,
                reservationCount: guest.reservationCount // Añadimos la propiedad reservationCount
            };
        });
    
        // Actualizar el estado con los datos transformados
        setGuests(data);
    }
    
  

    return (
        <section className="flex flex-col w-full items-center gap-2">
            <button className="px-2 bg-blue-400 text-white rounded-md" onClick={getGuests}>mostrar todos</button>
            <button className="px-2 bg-blue-400 text-white rounded-md" onClick={getGuestsMultipleRooms}>mostrar habitaciones</button>
            <ul className="flex flex-col w-full items-center">
                {guests && 
                    guests.map(guest => 
                        <div className="w-3/4 flex" key={guest.guest_id}>
                            <GuestInfo className="w-3/4 flex" guest={guest} />
                            <section className="flex flex-col gap-4 border border-gray-300 p-2">
                                <button onClick={() => setStatus(!status)}>editar</button>
                                {status && <InputUpdateGuestPhone guest_id={guest.guest_id} />}
                            </section>
                        </div>)
                }
            </ul>
        </section>
    )
}
