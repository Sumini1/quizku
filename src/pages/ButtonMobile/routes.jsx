import React from "react"

import Beranda from "./Home/Beranda"
import Pembelajaran from "./Home/Pembelajaran"
import ProfilSaya from "./Home/ProfilSaya"
import Settings from "./Home/Settings"
import Progress from "./Home/Progress"
import ProgressDetail from "./ProgressPage/ProgresDetail"
import PapanPeringkat from "./Home/PapanPeringkat"

export const buttonMobileRoutes = [
    {
        path : "/beranda",
        element : <Beranda />

    },
    {
        path: "/pembelajaran",
        element: <Pembelajaran />
    },
    {
        path: "/profil",
        element: <ProfilSaya />
    },
    {
        path: "/settings",
        element: <Settings />
    },
    {
        path: "/progress",
        element: <Progress />
    },
    {
        path: "/progress-detail",
        element: <ProgressDetail />
    },
    {
        path: "/papan-peringkat",
        element: <PapanPeringkat />
    }
]