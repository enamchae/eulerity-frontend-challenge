import { PetsDataGetter } from "@/hooks/useFetchPetsData";
import { PetView } from "./PetView";
import styled from "styled-components";
import { RefObject } from "react";

export const PetsListView = ({
    petsDataGetter,
    listScrollerRef,
}: {
    petsDataGetter: PetsDataGetter,
    listScrollerRef: RefObject<HTMLDivElement>,
}) => {
    const petsList = petsDataGetter.tryGet();

    return (
        <ListContainer>
            {petsList.map(pet => (
                <PetView
                    key={pet.id}
                    pet={pet}
                    listScrollerRef={listScrollerRef}
                />
            ))}
        </ListContainer>
    );
};

const ListContainer = styled.div`
--n-columns: 4;

grid-area: 2/1;

display: grid;
grid-template-columns: repeat(var(--n-columns), 1fr);
grid-auto-rows: 16rem;
gap: 1rem;

perspective: 1200px;

align-items: stretch;

@media screen and (max-width: 1600px) {
    --n-columns: 3;
}
@media screen and (max-width: 1024px) {
    --n-columns: 2;
}
@media screen and (max-width: 720px) {
    --n-columns: 1;
}
`;