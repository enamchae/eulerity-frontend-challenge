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
color: inherit;
font: inherit;

border: 1.5px solid currentcolor;
padding: 0.5rem;

background: none;
border-radius: 1.5rem / 1rem;

&:hover {
    background: #386a8f1f;
}

&:active {
    background: var(--col-fg);
    border-color: var(--col-fg);
    color: #fff;
}
`;