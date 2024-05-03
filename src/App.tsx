import { Suspense } from 'react';
import './App.css';
import { useFetchPetsData } from "./hooks/useFetchPetsData";
import { PetsListView } from './components/PetsListView';
import styled from 'styled-components';

const App = () => {
    const petsDataGetter = useFetchPetsData();

    return (
        <AppContainer>
            <TitleBar />

            <ListContainer>
                <h1>These are my pets (no they are not “wild animals” you cannot take them away from me)</h1>
                <Suspense fallback={<>loading</>}>
                    <PetsListView petsDataGetter={petsDataGetter} />
                </Suspense>
            </ListContainer>

            <ControlBar />
        </AppContainer>
    )
};

const AppContainer = styled.div`
max-width: 1280px;
margin: 0 auto;
height: 100%;
display: flex;
flex-direction: column;
padding: 2rem;
text-align: center;
`;

const TitleBar = styled.div`
flex-grow: 1;
`;

const ListContainer = styled.div`
height: 65vh;
`;

const ControlBar = styled.div`
flex-grow: 1;
`;

export default App;
