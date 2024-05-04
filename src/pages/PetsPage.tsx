import { Suspense, useRef } from "react";
import "@/App.css";
import { PetsListView } from "@/components/PetsListView";
import styled from "styled-components";
import { ControlBar } from "@/components/ControlBar";
import { Loading } from "@/components/Loading";
import { TitleBar } from "@/components/TitleBar";

export const PetsPage = () => {
    const listScrollerRef = useRef<HTMLDivElement>(null);

    return (
        <AppContainer>
            <TitleBar listScrollerRef={listScrollerRef} />

            <PetsListScroller
                ref={listScrollerRef}
            >
                <Suspense fallback={<Loading />}>
                    <PetsListView listScrollerRef={listScrollerRef} />
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
        </AppContainer>
    );
};

const AppContainer = styled.div`
--side-padding: 2rem;

--col-fg: #183a2f;

margin: 0 auto;
height: 100%;
display: grid;
grid-template-rows: 25vh 1fr auto;
text-align: center;

background: linear-gradient(90deg, #77c194, #74bfec, #b07ce3);
`;

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
background: #fff;
`;

const GridSpacerHigh = styled.div`
grid-area: 1/1;
`;

const GridSpacerLow = styled.div`
grid-area: 3/1;
`;