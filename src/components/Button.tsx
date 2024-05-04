import { baseClickableCss, buttonClickEffectCss } from "@/styles";
import styled, { RuleSet, css } from "styled-components";

export const Button = ({
    children,
    onClick,
    disabled=false,
    style=css``,
}: {
    children: string,
    onClick: () => void,
    disabled?: boolean,
    style?: RuleSet<object>,
}) => {
    return (
        <ButtonContainer
            onClick={() => !disabled && onClick()}
            $disabled={disabled}
            $style={style}
        >
            {children}
        </ButtonContainer>
    )
};

const ButtonContainer = styled.button.attrs<{
    $disabled: boolean,
    $style: RuleSet<object>,
}>(props => props)`
${baseClickableCss}
${buttonClickEffectCss}

pointer-events: ${props => props.$disabled ? "none" : "auto"};
opacity: ${props => props.$disabled ? "0.3" : "1"};

${props => props.$style}
`;