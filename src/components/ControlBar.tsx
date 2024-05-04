import styled from "styled-components";
import { useAtom } from "jotai";
import { Dropdown } from "./Dropdown";
import { Button } from "./Button";
import { TextEntry } from "./TextEntry";
import { selectedPetsAtom, settingsAtom } from "@/store";
import { ClickAction, SortKey, SortOrder } from "$/Settings";

export const ControlBar = ({
    onSortChange,
}: {
    onSortChange: () => void,
}) => {
    const [settings, setSettings] = useAtom(settingsAtom);
    const [selectedPets, setSelectedPets] = useAtom(selectedPetsAtom);

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
                <SearchBar
                    value={settings.searchQuery}
                    onInput={() => {
                        
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

const SearchBar = styled(TextEntry)`
width: 100%;
`;