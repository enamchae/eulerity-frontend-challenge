import { Suspense, useEffect, useRef, useState } from 'react';
import './App.css';
import { useFetchPetsData } from "./hooks/useFetchPetsData";
import { PetsListView } from './components/PetsListView';
import styled from 'styled-components';
import { ControlBar } from './components/ControlBar';

const quartInOut = (t: number) => {
    if (t <= 0) {
        return 0;
    } else if (t <= 0.5) {
        return 8 * t**4;
    } else if (t <= 1) {
        return 1 - 8 * (1 - t)**4;
    } else {
        return 1;
    }
}

export const App = () => {
    const petsDataGetter = useFetchPetsData();
    
    const listScrollerRef = useRef<HTMLDivElement>(null);

    const [titleMovementProgress, setTitleMovementProgress] = useState(0);
    useEffect(() => {
        const updateMovementProgress = () => {
            setTitleMovementProgress(
                quartInOut(
                    (listScrollerRef.current?.scrollTop ?? 0)
                    / ((listScrollerRef.current?.offsetHeight ?? 1) / 2)
                )
            );
        };
        listScrollerRef.current?.addEventListener("scroll", updateMovementProgress);
        addEventListener("resize", updateMovementProgress);
        updateMovementProgress();

        return () => {
            listScrollerRef.current?.removeEventListener("scroll", updateMovementProgress);
            removeEventListener("resize", updateMovementProgress);
        };
    }, [listScrollerRef]);

    return (
        <AppContainer>
            <TitleBar>
                <ListTitle $movementProgress={titleMovementProgress}>
                    <Title>These are my pets!</Title>
                    <Subtitle>(no they are not “wild animals” you cannot take them away from me)</Subtitle>
                </ListTitle>
            </TitleBar>

            <PetsListScroller ref={listScrollerRef}>
                <Suspense fallback={<>loading</>}>
                    <PetsListView
                        petsDataGetter={petsDataGetter}
                        listScrollerRef={listScrollerRef}
                    />
                </Suspense>

                <GridSpacerHigh />
                <GridSpacerLow />
            </PetsListScroller>

            <ControlBar />
        </AppContainer>
    );
};

const AppContainer = styled.div`
--side-padding: 2rem;

margin: 0 auto;
height: 100%;
display: grid;
grid-template-rows: 1fr 75vh 1fr;
text-align: center;

background: linear-gradient(90deg, #aaa, #bbb);

> * {
    padding-left: var(--side-padding);
    padding-right: var(--side-padding);
}
`;

const TitleBar = styled.div`
grid-area: 1/1;

position: relative;

z-index: 1;
`;

const ListTitle = styled.div.attrs<{ $movementProgress: number }>(props => ({
    style: {
        "--movement-progress": props.$movementProgress,
    }
}))`
--movement-progress: 0;

position: absolute;
width: calc(100% - 2 * var(--side-padding));
top: calc(2rem * var(--movement-progress) + 25vh * (1 - var(--movement-progress)));
transform:
        scale(calc(1 - var(--movement-progress) * .4))
        translateY(calc(-50% * (1 - var(--movement-progress))));
transform-origin: top;
display: flex;
flex-direction: column;
gap: 1rem;
`;

const Title = styled.h1`
font-size: 3rem;
margin: 0;
`;

const Subtitle = styled.div`
font-size: 1.15rem;
`;

const PetsListScroller = styled.div`
--half-height: 0;

grid-area: 1/1 / -1/1;

overflow-y: auto;
overflow-x: hidden;
display: grid;
grid-auto-rows: 50vh 1fr 50vh;
min-height: 100%;

mask: linear-gradient(#0000, #000 30vh);
background: linear-gradient(#fff 70vh, #fff0);

`;

const GridSpacerHigh = styled.div`
grid-area: 1/1;
`;

const GridSpacerLow = styled.div`
grid-area: 3/1;
`;