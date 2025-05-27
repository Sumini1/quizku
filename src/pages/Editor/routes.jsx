import React from "react";
import PageEditor from "./PageEditor";
import ArtikelPage from "./Artikelpage";    

export const editorRoutes = [
    {
        path: "/editor",
        element: <PageEditor />,
    },
    {
        path: "/artikel",
        element: <ArtikelPage />,
    }
];