import { createBrowserRouter } from 'react-router-dom'

import { App } from '../App'
import { GuestPage } from '../pages/GuestPage'
import { RoomPage } from '../pages/RoomPage'
import { ReservationPage } from '../pages/ReservationPage'
import { Reservation } from '../pages/Reservation'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
           {
               path: '/',
               element: <GuestPage />
           },
           {
               path: '/room',
               element: <RoomPage />
           },
           {
               path: '/reservation',
               element: <ReservationPage />
           },
           {
               path: '/reservation/:id',
               element: <Reservation />
           }
        ],
    },
])