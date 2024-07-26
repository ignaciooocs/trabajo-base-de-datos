import { FindRoom } from "../components/findRoom";

export function RoomPage () {
    return (
        <div className="flex flex-col h-full items-center">
            <h2 className="text-3xl text-blue-500 p-4">Habitaciones</h2>
            <FindRoom />
        </div>
    )
}