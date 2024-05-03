import { PetsDataGetter } from "@/hooks/useFetchPetsData";
import { PetView } from "./PetView";

export const PetsListView = ({petsDataGetter}: {petsDataGetter: PetsDataGetter}) => {
    const petsList = petsDataGetter.tryGet();

    return petsList.map(pet => (
        <PetView
            key={pet.id}
            pet={pet}
        />
    ));
};