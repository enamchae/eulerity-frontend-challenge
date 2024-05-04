import { PetInfoOverlay } from "@/components/PetInfoOverlay";
import { Pet } from "$/Pet";
import { useLoaderData, useNavigate } from "react-router-dom";

export const PetInfoPage = () => {
    const pet = useLoaderData() as Pet;

    const navigate = useNavigate();

    return (
        <PetInfoOverlay
            pet={pet}
            onClose={() => navigate("/")}
        />
    );
};