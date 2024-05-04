import styled from "styled-components";
import { useAtom } from "jotai";
import { Dropdown } from "./Dropdown";
import { Button } from "./Button";
import { selectedPetsAtom, settingsAtom, visiblePetsAtom } from "@/store";
import { ClickAction, SortKey, SortOrder } from "$/Settings";
import { baseInputCss } from "@/styles";
import { useFetchPetsData } from "@/hooks/useFetchPetsData";
import { Pet } from "@/lib/Pet";

export const ControlBar = ({
    onSortChange,
}: {
    onSortChange: () => void,
}) => {
    const petsDataGetter = useFetchPetsData();

    const [settings, setSettings] = useAtom(settingsAtom);
    const [selectedPets, setSelectedPets] = useAtom(selectedPetsAtom);
    const [visiblePets, setVisiblePets] = useAtom(visiblePetsAtom);

    return (
        <ControlBarContainer>
            <ControlBarRow>
                <ControlBarSegment>
                    Sorted by
                    <Dropdown
                        value={settings.sortKey}
                        onChange={sortKey => {
                            setSettings({
                                ...settings,
                                sortKey,
                            });
                            onSortChange();
                        }}
                        options={new Map([
                            [SortKey.CreationTime, "creation time"],
                            [SortKey.Name, "name"],
                        ])}
                    />
                    in
                    <Dropdown
                        value={settings.sortOrder}
                        onChange={sortOrder => {
                            setSettings({
                                ...settings,
                                sortOrder,
                            });
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
                        value={settings.clickAction}
                        onChange={clickAction => setSettings({
                            ...settings,
                            clickAction,
                        })}
                        options={new Map([
                            [ClickAction.ViewDetails, "view details"],
                            [ClickAction.Select, "select it"],
                        ])}
                    />
                </ControlBarSegment>

                {
                    settings.clickAction === ClickAction.Select &&
                    <ControlBarSegment>
                        {selectedPets.size} pet{selectedPets.size === 1 ? " is" : "s are"} selected.
                        <Button
                            disabled={selectedPets.size === 0}
                            onClick={() => {
                                
                            }}
                        >
                            Download selected
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedPets(new Set(petsDataGetter.getElseEmptyArray()));
                            }}
                        >
                            Select all
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedPets(new Set([...selectedPets, ...visiblePets]));
                            }}
                        >
                            Select visible
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedPets(new Set());
                            }}
                        >
                            Clear selection
                        </Button>
                        <Button
                            onClick={() => {
                                const newSet = new Set<Pet>(selectedPets);
                                for (const pet of visiblePets) {
                                    newSet.delete(pet);
                                }
                                setSelectedPets(newSet);
                            }}
                        >
                            Deselect visible
                        </Button>
                    </ControlBarSegment>
                }
            </ControlBarRow>

            <ControlBarRow>
                <SearchBar
                    value={settings.searchQuery}
                    onInput={event => {
                        setSettings({
                            ...settings,
                            searchQuery: event.currentTarget.value,
                        });
                    }}
                    placeholder="Search"
                />
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
padding: 1.5rem 2rem;

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

const SearchBar = styled.input`
${baseInputCss}
width: 60ch;
`;