import { PetsDataGetter } from "@/hooks/useFetchPetsData";
import { PetView } from "./PetView";
import styled from "styled-components";

export const PetsListView = ({petsDataGetter}: {petsDataGetter: PetsDataGetter}) => {
    const petsList = petsDataGetter.tryGet();

    return (
        <PetsListContainer>
            {petsList.map(pet => (
                <PetView
                    key={pet.id}
                    pet={pet}
                />
            ))}
        </PetsListContainer>
    );
};

const PetsListContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1rem;
height: 100%;

perspective: 1000px;
`;