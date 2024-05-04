import { baseClickableCss, buttonClickEffectCss } from "@/styles";
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
            onClick={() => !disabled && onClick()}
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
${buttonClickEffectCss}

pointer-events: ${props => props.$disabled ? "none" : "auto"};
opacity: ${props => props.$disabled ? "0.3" : "1"};
`;