import styled from "styled-components";
import { Dropdown } from "./Dropdown";
import { Pet } from "$/Pet";
import { Button } from "./Button";

export enum SortKey {
    CreationTime,
    Name,
}

export enum SortOrder {
    Ascending,
    Descending,
}

export enum ClickAction {
    ViewDetails,
    Select,
}

export const ControlBar = ({
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    clickAction,
    setClickAction,
    selectedPets,
    setSelectedPets,
    onSortChange,
}: {
    sortKey: SortKey,
    setSortKey: (sortKey: SortKey) => void,
    sortOrder: SortOrder,
    setSortOrder: (sortOrder: SortOrder) => void,
    clickAction: ClickAction,
    setClickAction: (clickAction: ClickAction) => void,
    selectedPets: Set<Pet>,
    setSelectedPets: (selectedPets: Set<Pet>) => void,
    onSortChange: () => void,
}) => {
    return (
        <ControlBarContainer>
            <ControlBarSegment>
                Sorted by
                <Dropdown
                    value={sortKey}
                    onChange={value => {
                        setSortKey(value);
                        onSortChange();
                    }}
                    options={new Map([
                        [SortKey.CreationTime, "creation time"],
                        [SortKey.Name, "name"],
                    ])}
                />
                in
                <Dropdown
                    value={sortOrder}
                    onChange={value => {
                        setSortOrder(value);
                        onSortChange();
                    }}
                    options={new Map([
                        [SortOrder.Ascending, "ascending"],
                        [SortOrder.Descending, "descending"],
                    ])}
                />
                order
            </ControlBarSegment>

            <ControlBarSegment>
                Click a pet to
                <Dropdown
                    value={clickAction}
                    onChange={setClickAction}
                    options={new Map([
                        [ClickAction.ViewDetails, "view details"],
                        [ClickAction.Select, "select"],
                    ])}
                />
            </ControlBarSegment>

            <ControlBarSegment>
                {selectedPets.size} pets are selected.
                <Button>Download selected</Button>
                <Button>Clear selection</Button>
            </ControlBarSegment>
        </ControlBarContainer>
    );
};

const ControlBarContainer = styled.div`
grid-area: 3/1;

display: flex;
gap: 5rem;
justify-content: space-between;
align-items: center;
margin: 0 var(--side-padding) var(--side-padding) var(--side-padding);
overflow-x: auto;

background: #ffffffaf;
border-radius: 4rem / 3rem;

white-space: nowrap;

backdrop-filter: blur(8px);

z-index: 1;
`;

const ControlBarSegment = styled.div`
display: flex;
align-items: center;
gap: 1ch;
`;