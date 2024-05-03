import { PetsDataGetter } from "@/hooks/useFetchPetsData";
import { PetView } from "./PetView";
import styled from "styled-components";
import { RefObject, useRef } from "react";

export const PetsListView = ({
    petsDataGetter,
    listScrollerRef,
}: {
    petsDataGetter: PetsDataGetter,
    listScrollerRef: RefObject<HTMLDivElement>,
}) => {
    const petsList = petsDataGetter.tryGet();

    return (
        petsList.map(pet => (
            <PetView
                key={pet.id}
                pet={pet}
                listScrollerRef={listScrollerRef}
            />
        ))
    );
};