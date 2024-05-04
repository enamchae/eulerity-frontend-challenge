import { baseClickableCss } from "@/styles";
import styled from "styled-components";

export const Button = ({
    children,
    onClick,
    disabled=false,
}: {
    children: string,
    onClick: () => void,
    disabled?: boolean,
}) => {
    return (
        <ButtonContainer
            onClick={() => onClick()}
            $disabled={disabled}
        >
            {children}
        </ButtonContainer>
    )
};

const ButtonContainer = styled.button.attrs<{
    $disabled: boolean
}>(props => props)`
${baseClickableCss}

pointer-events: ${props => props.$disabled ? "none" : "auto"};
opacity: ${props => props.$disabled ? "0.3" : "1"};

&:active {
    background: var(--col-fg);
    border-color: var(--col-fg);
    color: #fff;
}
`;