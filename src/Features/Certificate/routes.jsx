import React from "react";

import DataDiriLanjutan from "./Users/DataDiriLanjutan";
import SertifikatKelulusan from "./Users/SertifikatKelulusan";
import TranskipNilai from "./Users/TranskipNilai";
import TranskipNilaiLanjutan from "./Users/TranskipNilaiLanjutan";

export const certificateRoutes = [
    {
        path: "/data-diri-lanjutan",
        element: <DataDiriLanjutan />,
    },
    {
        path: "/sertifikat-kelulusan",
        element: <SertifikatKelulusan />,
    },
    {
        path: "/transkip-nilai",
        element: <TranskipNilai />,
    },
    {
        path: "/transkip-nilai-lanjutan",
        element: <TranskipNilaiLanjutan />,
    },
];