import { createBrowserRouter } from "react-router-dom";
import { PetsPage } from "./pages/PetsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { PetInfoPage } from "./pages/PetInfoPage";
import { Layout } from "./pages/Layout";
import { Pet, PetJson, PetsListJson } from "$/Pet";
import Json5 from "json5";

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
                loader: async (args) => {
                    const petsListJson: PetsListJson = Json5.parse(
                        await fetch("/pets")
                                .then(response => response.text())
                    );
                    return Pet.json(petsListJson.find(pet => pet.id === args.params.petId)!);
                },
            },
        ],
    },
]);