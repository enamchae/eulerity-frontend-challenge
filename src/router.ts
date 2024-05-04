import { createBrowserRouter } from "react-router-dom";
import { PetsPage } from "./pages/PetsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: PetsPage,
    },
]);