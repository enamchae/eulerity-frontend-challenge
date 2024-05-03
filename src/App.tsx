import { Suspense } from 'react';
import './App.css';
import { useFetchPetsData } from "./hooks/useFetchPetsData";
import { PetsList } from './components/PetsList';

const App = () => {
    const petsDataGetter = useFetchPetsData();

    return (
        <>
            <h1>title</h1>
            <Suspense fallback={<>loading</>}>
                <PetsList petsDataGetter={petsDataGetter} />
            </Suspense>
        </>
    )
}

export default App
