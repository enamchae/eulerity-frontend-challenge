import { useEffect, useState } from "react";
import { Pet } from "$/Pet";
import Json5 from "json5";

enum PromiseState {
    Pending,
    Fulfilled,
    Rejected,
}

export type PetsDataGetter = {
    getElseThrowPromise(): Pet[],
    getElseEmptyArray(): Pet[],
};

let fetched = false;
let promise = Promise.resolve();
let promiseState = PromiseState.Pending;
let petsData: Pet[] = [];

export const useFetchPetsData = (): PetsDataGetter => {
    useEffect(() => {
        if (fetched) return;
        fetched = true;

        promise = fetch("/pets")
                .then(response => response.text())
                .then(
                    text => {
                        promiseState = PromiseState.Fulfilled;
                        petsData = Pet.listJson(Json5.parse(text));
                    },
                    () => {
                        promiseState = PromiseState.Rejected;
                    },
                );
    }, []);

    return {
        getElseThrowPromise() {
            switch (promiseState) {
                case PromiseState.Fulfilled:
                    return petsData;
                
                case PromiseState.Pending:
                    throw promise;

                case PromiseState.Rejected:
                    throw new Error();
            }
        },

        getElseEmptyArray() {
            return petsData;
        },
    };
};