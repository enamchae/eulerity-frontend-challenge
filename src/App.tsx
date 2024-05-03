import { Suspense } from 'react';
import './App.css';
import { useFetchPetsData } from "./hooks/useFetchPetsData";
import { PetsListView } from './components/PetsListView';

const App = () => {
    const petsDataGetter = useFetchPetsData();

    return (
        <>
            <h1>title</h1>
            <Suspense fallback={<>loading</>}>
                <PetsListView petsDataGetter={petsDataGetter} />
            </Suspense>
        </>
    )
}

export default App
