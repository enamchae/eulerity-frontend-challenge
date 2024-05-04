import "@/App.css";
import { ReactNode } from "react";
import { Outlet, RouteProps } from "react-router-dom";
import styled, { RuleSet, css } from "styled-components";

export const Layout = (props: RouteProps) => {
    return (
        <AppContainer>
            <Outlet />
        </AppContainer>
    );
};

const AppContainer = styled.div`
--side-padding: 2rem;

--col-fg: #183a2f;

margin: 0 auto;
width: 100vw;
height: 100vh;

min-height: 640px;
display: grid;
text-align: center;

background:
        linear-gradient(#fff0, #fff 30vh, #fff 70vh, #fff0),
        linear-gradient(90deg, #77c194, #74bfec, #b07ce3);
`;