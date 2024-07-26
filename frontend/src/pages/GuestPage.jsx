import { Findguest } from "../components/findGuest";

export function GuestPage () {
    return (
        <div className="flex flex-col h-full items-center">
            <h1 className="text-3xl text-blue-500 p-4">Huéspedes</h1>
            <Findguest />
        </div>
    )
}