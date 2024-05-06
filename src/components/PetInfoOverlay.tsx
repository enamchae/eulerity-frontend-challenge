import { Pet } from "$/Pet";
import { viewingPetInfoAtom } from "@/store";
import { fadeIn, fadeOut, linkCss } from "@/styles";
import { useAtom } from "jotai";
import styled, { css } from "styled-components";
import { ButtonX } from "./ButtonX";
import { useCallback, useEffect } from "react";
import { Button } from "./Button";

export const PetInfoOverlay = ({
    pet,
    onClose=() => {},
    visible,
}: {
    pet: Pet | null,
    onClose?: () => void,
    visible: boolean,
}) => {
    const [viewingPetInfo, setViewingPetInfo] = useAtom(viewingPetInfoAtom);


    const closeDialog = useCallback(() => {
        setViewingPetInfo(null);
        history.pushState({}, "", "/");

        onClose();
    }, [setViewingPetInfo, onClose]);

    useEffect(() => {
        const onPressEscape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            closeDialog();
        };

        addEventListener("keydown", onPressEscape);

        return () => {
            removeEventListener("keydown", onPressEscape);
        };
    }, [closeDialog]);

    if (pet === null) {
        return (
            <></>
        );
    }

    return (
        <Overlay
            onClick={closeDialog}
            $entering={visible}
        >
            <Dialog onClick={event => event.stopPropagation()}>
                <PetImagePositioner>
                    <PetImageLink
                        href={pet.imageUrl}
                        target="_blank"
                    >
                        <PetImage src={pet.imageUrl} />
                    </PetImageLink>
                </PetImagePositioner>

                <PetDetails>
                    <PetTitle>{pet.title}</PetTitle>
                    <PetDesc>{pet.desc}</PetDesc>
                    <PetDesc>
                        {pet.createdTimestamp.toLocaleDateString(undefined, {
                            month: "short",
                            year: "numeric",
                            day: "numeric",
                            weekday: "short",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                        })}
                    </PetDesc>

                    <Button
                        onClick={() => pet.downloadImage()}
                        style={downloadButtonCss}
                    >
                        Download image
                    </Button>

                    <PetLink
                        href={pet.url}
                        target="_blank"
                    >
                        {pet.url}
                    </PetLink>
                </PetDetails>

                <ButtonX
                    onClick={closeDialog}
                    style={closeButtonCss}
                />
            </Dialog>
        </Overlay>
    );
};

const Overlay = styled.div.attrs<{
    $entering: boolean,
}>(props => props)`
--overlay-padding: 2rem;

width: 100vw;
height: 100vh;
padding: var(--overlay-padding);
display: grid;
place-items: center;
backdrop-filter: blur(8px);

z-index: 1;


pointer-events: ${props => props.$entering ? "auto" : "none"};

animation: ${props => props.$entering ? fadeIn : fadeOut} 0.5s forwards ease-in-out;
`;

const Dialog = styled.div`
width: 100%;
height: calc(100vh - 2 * var(--overlay-padding));
display: grid;
overflow: auto;
position: relative;

grid-template-columns: 2fr 3fr;
@media screen and (max-width: 1280px) {
    grid-template-columns: unset;
    grid-template-rows: 2fr 3fr;
}

align-items: stretch;

background: #ffffffcf;
border-radius: 6rem / 4rem;

> * {
    padding: var(--overlay-padding);
}
`;

const PetImagePositioner = styled.div`
display: grid;
place-items: center;
width: 100%;
height: calc(100vh - 4 * var(--overlay-padding));
place-self: center;
@media screen and (max-width: 1280px) {
    width: unset;
    height: 20rem;
}
`;

const PetImageLink = styled.a`
max-height: calc(100vh - 6 * var(--overlay-padding));
@media screen and (max-width: 1280px) {
    height: 100%;
}

color: inherit;
`;

const PetImage = styled.img`
width: 100%;
max-height: calc(100vh - 6 * var(--overlay-padding));
@media screen and (max-width: 1280px) {
    height: 100%;
}

border-radius: 3rem / 2rem;
box-shadow: 0 8px 64px currentcolor;

transition: filter .25s ease-in-out;

&:hover {
    filter: brightness(1.5);
}

&:active {
    filter: brightness(0.5);
}
`;

const PetDetails = styled.div`
display: flex;
flex-direction: column;
align-items: start;
justify-content: center;

text-align: left;

@media screen and (max-width: 1280px) {
    align-items: center;
    justify-content: start;
    
    text-align: center;
}
`;

const PetTitle = styled.h1`
margin: 1rem 0;
font-size: 5rem;

@media screen and (max-width: 1280px) {
    font-size: 2.5rem;
}
`;

const PetDesc = styled.div`
font-size: 2rem;

@media screen and (max-width: 1280px) {
    font-size: 1.5rem;
}
`;

const PetLink = styled.a`
${linkCss}

font-size: 1.5rem;

@media screen and (max-width: 1280px) {
    font-size: 1rem;
}
`;

const downloadButtonCss = css`
font-size: 1.5rem;
margin: 2rem 0;

@media screen and (max-width: 1280px) {
    font-size: 1rem;
}
`;

const closeButtonCss = css`
position: absolute;
top: var(--overlay-padding);
right: var(--overlay-padding);
font-size: 2rem;
`;