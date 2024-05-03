import { useEffect, useState } from "react";
import { Pet } from "$/Pet";
import Json5 from "json5";

enum PromiseState {
    Pending,
    Fulfilled,
    Rejected,
}

export type PetsDataGetter = {
    tryGet(): Pet[],
};

export const useFetchPetsData = (): PetsDataGetter => {
    const [promise, setPromise] = useState(Promise.resolve());
    const [promiseState, setPromiseState] = useState(PromiseState.Pending);
    const [petsData, setPetsData] = useState<Pet[]>([]);

    useEffect(() => {
        setPromise(
            fetch("/pets")
                    .then(response => response.text())
                    .then(
                        text => {
                            setPromiseState(PromiseState.Fulfilled);
                            setPetsData(Pet.listJson(Json5.parse(text)));
                        },
                        () => {
                            setPromiseState(PromiseState.Rejected);
                        },
                    )
        );
    }, []);

    return {
        tryGet() {
            switch (promiseState) {
                case PromiseState.Fulfilled:
                    return petsData;
                
                case PromiseState.Pending:
                    throw promise;

                case PromiseState.Rejected:
                    throw new Error();
            }
        },
    };
};