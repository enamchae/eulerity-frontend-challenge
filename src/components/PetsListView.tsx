import { useFetchPetsData } from "@/hooks/useFetchPetsData";
import { PetView } from "./PetView";
import styled from "styled-components";
import { useAtom } from "jotai";
import { RefObject, useEffect, useMemo } from "react";
import { SortKey, SortOrder } from "$/Settings";
import { settingsAtom, visiblePetsAtom } from "@/store";

export const PetsListView = ({
    listScrollerRef,
}: {
    listScrollerRef: RefObject<HTMLDivElement>,
}) => {
    const petsDataGetter = useFetchPetsData();

    const [settings, setSettings] = useAtom(settingsAtom);
    const [visiblePets, setVisiblePets] = useAtom(visiblePetsAtom);

    // naive searching
    const petsListFiltered = useMemo(
        () => petsDataGetter.getElseThrowPromise()
                .filter(pet => {
                    if (settings.searchQuery.length === 0) return true;

                    const targetString = `${pet.title}${pet.desc}`.toUpperCase().replaceAll(/\s/g, "");
                    const query = settings.searchQuery.toUpperCase().replaceAll(/\s/g, "");

                    let queryCursor = 0;
                    for (let targetStringCursor = 0; targetStringCursor < targetString.length; targetStringCursor++) {
                        if (targetString[targetStringCursor] !== query[queryCursor]) continue;

                        queryCursor++;
                        if (queryCursor === query.length) {
                            return true;
                        }
                    }
                    return false;
                }),
        [settings.searchQuery]
    );

    useEffect(() => {
        setVisiblePets(petsListFiltered);
    }, [petsListFiltered, setVisiblePets]);

    const petsList = useMemo(
        () => petsListFiltered
                //sorting
                .sort((a, b) => {
                    const aBeforeB = settings.sortKey === SortKey.CreationTime
                            ? a.createdTimestamp.getTime() < b.createdTimestamp.getTime()
                            : a.title < b.title;

                    if (aBeforeB) {
                        return settings.sortOrder === SortOrder.Ascending ? -1 : 1;
                    } else {
                        return settings.sortOrder === SortOrder.Ascending ? 1 : -1;
                    }
                }),
        [petsListFiltered, settings.sortKey, settings.sortOrder]
    );

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