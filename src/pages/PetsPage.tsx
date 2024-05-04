import { Suspense, useRef } from "react";
import "@/App.css";
import { PetsListView } from "@/components/PetsListView";
import styled, { css } from "styled-components";
import { ControlBar } from "@/components/ControlBar";
import { Loading } from "@/components/Loading";
import { TitleBar } from "@/components/TitleBar";
import { useAtom } from "jotai";
import { visiblePetsAtom } from "@/store";
import { Layout } from "./Layout";

export const PetsPage = () => {
    const [visiblePets, setVisiblePets] = useAtom(visiblePetsAtom);

    const listScrollerRef = useRef<HTMLDivElement>(null);

    return (
        <Layout style={css`
grid-template-rows: 25vh 1fr auto;
`}>
            <TitleBar listScrollerRef={listScrollerRef} />

            <PetsListScroller
                ref={listScrollerRef}
            >
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
        </Layout>
    );
};

const PetsListScroller = styled.div`
--half-height: 0;

grid-area: 1/1 / -1/1;

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