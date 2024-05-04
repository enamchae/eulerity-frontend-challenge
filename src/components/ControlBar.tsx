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
            <ControlBarRow>
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
                            [ClickAction.Select, "select it"],
                        ])}
                    />
                </ControlBarSegment>

                {
                    clickAction === ClickAction.Select &&
                    <ControlBarSegment>
                        {selectedPets.size} pet{selectedPets.size === 1 ? " is" : "s are"} selected.
                        <Button
                            onClick={() => {
                                
                            }}
                        >
                            Download selected
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedPets(new Set());
                            }}
                        >
                            Clear selection
                        </Button>
                    </ControlBarSegment>
                }
            </ControlBarRow>

            <ControlBarRow>
                Search
            </ControlBarRow>
        </ControlBarContainer>
    );
};

const ControlBarContainer = styled.div`
grid-area: 3/1;

display: flex;
flex-direction: column;=
justify-content: space-around;
margin: 0 var(--side-padding) var(--side-padding) var(--side-padding);
overflow-x: hidden;

background: #ffffffaf;
border-radius: 4rem / 3rem;

white-space: nowrap;

backdrop-filter: blur(8px);

z-index: 1;
`;

const ControlBarRow = styled.div`
display: flex;
flex-wrap: wrap;
gap: 0.5rem 6rem;
align-items: center;
position: relative;
overflow-x: auto;
padding: 1rem 2rem;

+ div::before {
    content: " ";
    position: absolute;
    width: 80%;
    height: 2px;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    
    background: currentcolor;
    opacity: 0.5;
}
`;

const ControlBarSegment = styled.div`
display: flex;
align-items: center;
gap: 1ch;
`;