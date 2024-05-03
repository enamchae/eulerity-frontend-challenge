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

background: #aaaaaa7f;
`;