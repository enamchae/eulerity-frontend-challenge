import styled from "styled-components";

export const ControlBar = () => {
    return (
        <ControlBarContainer>
            <div>
                Sort
            </div>

            <div>
                Select
            </div>
        </ControlBarContainer>
    );
};

const ControlBarContainer = styled.div`
grid-area: 3/1;

display: flex;
justify-content: space-between;
align-items: center;
margin: 0 var(--side-padding) var(--side-padding) var(--side-padding);

background: #ffffffaf;
border-radius: 4rem / 3rem;

backdrop-filter: blur(8px);

z-index: 1;
`;