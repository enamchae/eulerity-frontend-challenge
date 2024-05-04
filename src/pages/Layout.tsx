import "@/App.css";
import { ReactNode } from "react";
import styled, { RuleSet, css } from "styled-components";

export const Layout = ({
    children,
    style=css``,
}: {
    children: ReactNode,
    style?: RuleSet<object>,
}) => {
    return (
        <AppContainer $style={style}>
            {children}
        </AppContainer>
    );
};

const AppContainer = styled.div.attrs<{
    $style: RuleSet<object>,
}>(props => props)`
${props => props.$style}

--side-padding: 2rem;

--col-fg: #183a2f;

margin: 0 auto;
height: 100%;
display: grid;
text-align: center;

background:
        linear-gradient(#fff0, #fff 30vh, #fff 70vh, #fff0),
        linear-gradient(90deg, #77c194, #74bfec, #b07ce3);
`;