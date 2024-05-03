import { Suspense, useEffect, useRef, useState } from 'react';
import './App.css';
import { useFetchPetsData } from "./hooks/useFetchPetsData";
import { PetsListView } from './components/PetsListView';
import styled from 'styled-components';
import { ControlBar } from './components/ControlBar';

const App = () => {
    const petsDataGetter = useFetchPetsData();
    
    const listScrollerRef = useRef<HTMLDivElement>(null);

    const [titleMovementProgress, setTitleMovementProgress] = useState(0);
    useEffect(() => {
        const updateMovementProgress = () => {
            setTitleMovementProgress(
                Math.max(0, Math.min(1,
                    (listScrollerRef.current?.scrollTop ?? 0)
                    / ((listScrollerRef.current?.offsetHeight ?? 1) / 4)
                ))
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
                    These are my pets (no they are not “wild animals” you cannot take them away from me)
                </ListTitle>
            </TitleBar>

            <PetsListScroller
                ref={listScrollerRef}
                $halfHeight={(listScrollerRef.current?.offsetHeight ?? 0) / 2}
            >
                <Suspense fallback={<>loading</>}>
                    <PetsListView
                        petsDataGetter={petsDataGetter}
                        listScrollerRef={listScrollerRef}
                    />
                </Suspense>
            </PetsListScroller>

            <ControlBar />
        </AppContainer>
    );
};

const AppContainer = styled.div`
margin: 0 auto;
height: 100%;
display: grid;
grid-template-rows: 1fr 75vh 1fr;
text-align: center;

> * {
    padding-left: 2rem;
    padding-right: 2rem;
}
`;

const TitleBar = styled.div`
grid-area: 1/1;

position: relative;

background: #aaaaaa7f;
`;

const ListTitle = styled.h1.attrs<{ $movementProgress: number }>(props => ({
    style: {
        "--movement-progress": props.$movementProgress,
    }
}))`
--movement-progress: 0;

position: absolute;
width: 100%;
top: calc(100% * (1 - var(--movement-progress)));
margin: 0;

transform: scale(calc(1 - var(--movement-progress) * .4));
transform-origin: top;
`;

const PetsListScroller = styled.div.attrs<{ $halfHeight: number }>(props => ({
    style: {
        "--half-height": `${props.$halfHeight}px`,
    },
}))`
--half-height: 0;

grid-area: 1/1 / -1/1;s

overflow-y: auto;
overflow-x: hidden;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-auto-rows: 12rem;
gap: 1rem;
height: 100%;
position: relative;
padding: var(--half-height) 2rem;
`;

export default App;
