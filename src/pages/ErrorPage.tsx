import { Link } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "./Layout";
import { linkCss } from "@/styles";

export const ErrorPage = () => {
    return (
        <Layout>
            <Grid>
                <div>
                    <div>Encountered an error! Likely the page you’re looking for doesn’t exist. :(</div>
                    <ReturnLink to="/">
                        Return home?
                    </ReturnLink>
                </div>
            </Grid>
        </Layout>
    );
};

const Grid = styled.div`
display: grid;
width: 100vw;
height: 100vh;
align-items: center;
`;

const ReturnLink = styled(Link)`
${linkCss}
`;