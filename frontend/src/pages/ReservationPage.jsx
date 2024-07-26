import { FindReservations } from "../components/findReservation";

export function ReservationPage () {
    return (
        <div className="flex flex-col h-full items-center">
           <h2 className="text-3xl text-blue-500 p-4"> Reservaciones</h2>
           <FindReservations />
        </div>
    )
}