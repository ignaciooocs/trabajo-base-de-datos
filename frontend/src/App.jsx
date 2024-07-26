import { NavLink, Outlet } from "react-router-dom";
import './index.css'
export function App () {
    return (
        <div>
            <nav className="flex gap-4 p-4 bg-black text-white">
                <NavLink to="/">Huéspedes</NavLink>
                <NavLink to="/room">Habitaciones</NavLink>
                <NavLink to="/reservation">Reservaciones</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}