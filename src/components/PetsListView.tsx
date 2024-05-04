import { PetsDataGetter } from "@/hooks/useFetchPetsData";
import { PetView } from "./PetView";
import styled from "styled-components";
import { RefObject, useMemo } from "react";
import { SortKey, SortOrder } from "./ControlBar";

export const PetsListView = ({
    petsDataGetter,
    listScrollerRef,
    sortKey,
    sortOrder,
}: {
    petsDataGetter: PetsDataGetter,
    listScrollerRef: RefObject<HTMLDivElement>,
    sortKey: SortKey,
    sortOrder: SortOrder,
}) => {
    const petsList = useMemo(
        () => petsDataGetter.tryGet()
                .sort((a, b) => {
                    const aBeforeB = sortKey === SortKey.CreationTime
                            ? a.createdTimestamp.getTime() < b.createdTimestamp.getTime()
                            : a.title < b.title;

                    if (aBeforeB) {
                        return sortOrder === SortOrder.Ascending ? -1 : 1;
                    } else {
                        return sortOrder === SortOrder.Ascending ? 1 : -1;
                    }
                }),
        [petsDataGetter, sortKey, sortOrder]
    );

    return (
        <ListContainer>
            {petsList.map(pet => (
                <PetView
                    key={pet.id}
                    pet={pet}
                    listScrollerRef={listScrollerRef}
                    sortKey={sortKey}
                    sortOrder={sortOrder}
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