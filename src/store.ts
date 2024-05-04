import {atom} from "jotai";
import { ClickAction, Settings, SortKey, SortOrder } from "$/Settings";
import { Pet } from "$/Pet";

export const settingsAtom = atom(<Settings>{
    sortKey: SortKey.CreationTime,
    sortOrder: SortOrder.Ascending,
    clickAction: ClickAction.ViewDetails,
    searchQuery: "",
});

export const selectedPetsAtom = atom(new Set<Pet>());