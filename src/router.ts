import { createBrowserRouter } from "react-router-dom";
import { PetsPage } from "./pages/PetsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { PetInfoPage } from "./pages/PetInfoPage";
import { Layout } from "./pages/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        ErrorBoundary: ErrorPage,
        children: [
            {
                index: true,
                Component: PetsPage,
            },
            {
                path: "pet/:petId",
                Component: PetInfoPage,
            },
        ],
    },
]);