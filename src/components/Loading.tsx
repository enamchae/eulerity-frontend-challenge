import styled from "styled-components";

export const Loading = () => {
    return (
        <LoadingContainer>
            <LoadingText>Loading pets!!</LoadingText>
        </LoadingContainer>
    );
};

const LoadingContainer = styled.div`
display: grid;
`;

const LoadingText = styled.div`
font-size: 1.5rem;
`;
