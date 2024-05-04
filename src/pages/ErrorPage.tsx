import styled from "styled-components";

export const ErrorPage = () => {
    return (
        <Grid>Encountered an error :(</Grid>
    )
};

const Grid = styled.div`
display: grid;
width: 100vw;
height: 100vh;
place-items: center;
`