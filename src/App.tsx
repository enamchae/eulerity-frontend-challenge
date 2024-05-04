import { Suspense, useEffect, useRef, useState } from 'react';
import './App.css';
import { useFetchPetsData } from "./hooks/useFetchPetsData";
import { PetsListView } from './components/PetsListView';
import styled from 'styled-components';
import { ControlBar } from './components/ControlBar';
import { Loading } from './components/Loading';

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
            <TitleBar $movementProgress={titleMovementProgress}>
                <ListTitle>
                    <Title>These are my pets!</Title>
                    <Subtitle>(no they are not “wild animals” you cannot take them away from me)</Subtitle>
                </ListTitle>
            </TitleBar>

            <PetsListScroller ref={listScrollerRef}>
                <Suspense fallback={<Loading />}>
                    <PetsListView
                        petsDataGetter={petsDataGetter}
                        listScrollerRef={listScrollerRef}
                    />
                </Suspense>

                {/* To ensure that the empty 1st and 3rd grid rows can be scrolled into (functioning as padding) */}
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
grid-template-rows: 25vh 1fr 6rem;
text-align: center;

background: linear-gradient(90deg, #77c194, #74bfec, #b07ce3);

> * {
    padding-left: var(--side-padding);
    padding-right: var(--side-padding);
}
`;

const TitleBar = styled.div.attrs<{ $movementProgress: number }>(props => ({
    style: {
        "--movement-progress": props.$movementProgress,
    }
}))`
--movement-progress: 0;

grid-area: 1/1;
position: relative;

background: radial-gradient(ellipse at 50% 25%, rgba(24, 58, 47, calc(var(--movement-progress) * 0.75)), #0000 50%);

z-index: 1;
`;

const ListTitle = styled.div`
position: absolute;
width: calc(100% - 2 * var(--side-padding));
top: calc(2rem * var(--movement-progress) + 25vh * (1 - var(--movement-progress)));
display: flex;
flex-direction: column;
gap: 1rem;
pointer-events: none;

transform:
        scale(calc(1 - var(--movement-progress) * .4))
        translateY(calc(-50% * (1 - var(--movement-progress))));
transform-origin: top;

text-shadow: 0 0 #fff;
color: rgba(24, 58, 47, calc(round(1.2 - var(--movement-progress))));
`;

const Title = styled.h1`
font-size: 3rem;
margin: 0;
`;

const Subtitle = styled.div`
font-size: calc(1.5rem * var(--movement-progress) + 1.15rem * (1 - var(--movement-progress)));
`;

const PetsListScroller = styled.div`
--half-height: 0;

grid-area: 1/1 / -1/1;

overflow-y: auto;
overflow-x: hidden;
display: grid;
grid-auto-rows: 50vh 1fr 50vh;
min-height: 100%;

mask: linear-gradient(#0000, #000 30vh, #000 70vh, #0000);
background: #fff;
`;

const GridSpacerHigh = styled.div`
grid-area: 1/1;
`;

const GridSpacerLow = styled.div`
grid-area: 3/1;
`;