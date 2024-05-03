import { PetsDataGetter } from "../hooks/useFetchPetsData";

export const PetsList = ({petsDataGetter}: {petsDataGetter: PetsDataGetter}) => {
    const petsList = petsDataGetter.tryGet();

    return petsList.map(pet => (
        <div key={pet.id}>
            <div>{pet.title}</div>
            <div>{pet.desc}</div>
        </div>
    ));
};