import { useParams } from "react-router-dom"
import  { useQuery } from "@tanstack/react-query"
import { ReservationInfo } from "../components/ReservationInfo"

export function Reservation () {
    const {id} = useParams()

    const { data, isLoading, error} = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:4000/reservation/find/${id}`)
            const data = await response.json()
            return data
        }
    })

    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>Error</p>

    if (!data) return <p>No hay reservaciones</p>

    return (
        <section>
           {data && <ReservationInfo reservation={data} />}
        </section>
    )
}