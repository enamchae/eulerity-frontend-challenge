import { Suspense, useRef } from "react";
import "@/App.css";
import { PetsListView } from "@/components/PetsListView";
import styled from "styled-components";
import { ControlBar } from "@/components/ControlBar";
import { Loading } from "@/components/Loading";
import { TitleBar } from "@/components/TitleBar";
import { useAtom } from "jotai";
import { viewingPetInfoAtom, visiblePetsAtom } from "@/store";
import { PetInfoOverlay } from "@/components/PetInfoOverlay";

export const PetsPage = () => {
    const [visiblePets, setVisiblePets] = useAtom(visiblePetsAtom);
    const [viewingPetInfo, setViewingPetInfo] = useAtom(viewingPetInfoAtom);

    const listScrollerRef = useRef<HTMLDivElement>(null);

    return (
        <Grid>
            <TitleBar listScrollerRef={listScrollerRef} />

            <PetsListScroller ref={listScrollerRef}>
                <Suspense fallback={<Loading />}>
                    {
                        visiblePets &&
                        <PetsListView listScrollerRef={listScrollerRef} />
                    }
                </Suspense>

                {/* To ensure that the empty 1st and 3rd grid rows can be scrolled into (functioning as padding) */}
                <GridSpacerHigh />
                <GridSpacerLow />
            </PetsListScroller>

            <ControlBar
                onSortChange={() => {
                    // preserve scroll position
                    const scrollPosition = listScrollerRef.current?.scrollTop ?? 0;
                    setTimeout(() => {
                        listScrollerRef.current?.scrollTo(0, scrollPosition);
                    }, 0);
                }}
            />

            {
                viewingPetInfo &&
                <PetInfoOverlay pet={viewingPetInfo} />
            }
        </Grid>
    );
};

const Grid = styled.div`
display: grid;
height: 100vh;

> * {
    grid-area: 1/1;
}
`

const PetsListScroller = styled.div`
--half-height: 0;

overflow-y: auto;
overflow-x: hidden;
display: grid;
grid-auto-rows: 45vh 1fr 45vh;
min-height: 100%;
padding-left: var(--side-padding);
padding-right: var(--side-padding);

mask: linear-gradient(#0000, #000 30vh, #000 70vh, #0000);
`;

const GridSpacerHigh = styled.div`
grid-area: 1/1;
`;

const GridSpacerLow = styled.div`
grid-area: 3/1;
`;