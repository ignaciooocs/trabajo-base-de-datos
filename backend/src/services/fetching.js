export async function fetchrooms () {
    try {
        const rooms = await fetch('http://localhost:4000/room/find')
        const data = await rooms.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

// funcion para traer las habitaciones activas
export async function fetchroomsActive () {
    try {
        const rooms = await fetch('http://localhost:4000/room/find_available')
        const data = await rooms.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

// Consulta habitaciones disponibles en un rango de precios (por ejemplo, entre 50 y 150).
export async function fetchroomsAvailableRange ({range_1, range_2}) {
    try {
        const rooms = await fetch(`http://localhost:4000/room/find_available_range?range_1=${range_1}&range_2=${range_2}`)
        const data = await rooms.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

// oBuscar habitaciones que tengan un conjunto específico de servicios (por ejemplo, services: ["WiFi", "TV"]).
export async function fetchRoomsWithServices ({services}) {
    try {
        const rooms = await fetch(`http://localhost:4000/room/find_with_services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({services})
        })
        const data = await rooms.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

// Incluye un arreglo de servicios disponibles en cada habitación (por ejemplo, services: ["WiFi", "TV", "Aire acondicionado"]).
export async function updateRoomsServices ({services, room_number}) {
    try {
        const rooms = await fetch('http://localhost:4000/room/update_services', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({services, room_number})
        })
        const data = await rooms.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

// Actualizar la información de un servicio específico en una habitación (por ejemplo, cambiar "WiFi" por "High-Speed WiFi").
export async function updateRoomService ({service, newService, room_number}) {
    try {
        const rooms = await fetch('http://localhost:4000/room/update_service', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({service, newService, room_number})
        })
        const data = await rooms.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

export async function fetchguest () {
    try {
        const guests = await fetch('http://localhost:4000/guest/find')
        const data = await guests.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

//Buscar huéspedes que hayan reservado múltiples habitaciones (más de una reserva).
export async function fetchguestsMultipleRooms () {
    try {
        const guests = await fetch('http://localhost:4000/reservation/find_multiple_rooms')
        const data = await guests.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

export async function fetchReservations () {
    try {
        const reservations = await fetch('http://localhost:4000/reservation/find')
        const data = await reservations.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

// Consulta todas las reservas activas (status = "active").
 export async function fetchReservationsActive () {
    try {
        const reservations = await fetch('http://localhost:4000/reservation/find_active')
        const data = await reservations.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }                                                       
}

// oConsulta reservas activas en un rango de fechas (por ejemplo, entre "2024-07-01" y "2024-07-10").
export async function fetchReservationsActiveRange ({date1, date2}) {
    try {
        const reservations = await fetch(`http://localhost:4000/reservation/find_active_range?date1=${date1}&date2=${date2}`)
        const data = await reservations.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

// Buscar reservas que incluyan habitaciones con un servicio específico (por ejemplo, room_info.services = "WiFi").
export async function fetchReservationsWithService ({service}) {
    try {
        const reservations = await fetch(`http://localhost:4000/reservation/find_with_services?service=${service}`)
        const data = await reservations.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al buscar las reservas ' + error)
    }
}

// insert a reservation
export async function insertReservation ({guest_id, room_number, status, reservation_id, check_in, check_out}) {
    try {
        const reservation = await fetch('http://localhost:4000/reservation/insertone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({guest_id, room_number, status, reservation_id, check_in, check_out})
        })
        const data = await reservation.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al insertar las reservas ' + error)
    }
}