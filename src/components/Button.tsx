import { baseClickableCss } from "@/styles";
import styled from "styled-components";

export const Button = ({
    children,
    onClick,
}: {
    children: string,
    onClick: () => void,
}) => {
    return (
        <ButtonContainer onClick={() => onClick()}>
            {children}
        </ButtonContainer>
    )
};

const ButtonContainer = styled.button`
${baseClickableCss}

&:active {
    background: var(--col-fg);
    border-color: var(--col-fg);
    color: #fff;
}
`;