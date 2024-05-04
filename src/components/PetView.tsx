import { Pet } from "$/Pet";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "@/styles";
import { selectedPetsAtom, settingsAtom, viewingPetInfoAtom } from "@/store";
import { ClickAction } from "@/lib/Settings";
import { useNavigate } from "react-router-dom";

/** Proportion of the scroller that it takes for an entry to appear from the bottom and disappear at the top */
const SCROLLER_PROPORTION = 0.65;

export const PetView = ({
    pet,
    listScrollerRef,
}: {
    pet: Pet,
    listScrollerRef: RefObject<HTMLDivElement>,
}) => {
    const [settings, setSettings] = useAtom(settingsAtom);
    const [selectedPets, setSelectedPets] = useAtom(selectedPetsAtom);
    const [viewingPetInfo, setViewingPetInfo] = useAtom(viewingPetInfoAtom);

    const [rotation, setRotation] = useState(0);
    const [translation, setTranslation] = useState(0);
    const [animationLag, setAnimationLag] = useState(0);
    const [animationOvershoot, setAnimationOvershoot] = useState(0)

    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        setAnimationLag(Math.random() + 0.5);
        setAnimationOvershoot(Math.random() + 1.2);
    }, []);

    
    const updateMovementProgress = useCallback(() => {
        const yProportion = (
            // center of the entry element
            (containerRef.current?.offsetTop ?? 0)
            + (containerRef.current?.offsetHeight ?? 0) / 2

            - (listScrollerRef.current?.scrollTop ?? 0)

            // centering
            - (listScrollerRef.current?.offsetHeight ?? 0) * (1 - SCROLLER_PROPORTION) / 2

            + (listScrollerRef.current?.offsetHeight ?? 0) * 0.45
        ) / ((listScrollerRef.current?.offsetHeight ?? 1) * SCROLLER_PROPORTION);

        const yProportionClamped = Math.tanh(yProportion * 2 - 1);

        setRotation(-Math.asin(yProportionClamped));
        setTranslation(Math.sqrt(1 - yProportionClamped**2) - 1);
    }, [listScrollerRef]);

    useEffect(() => {
        listScrollerRef.current?.addEventListener("scroll", updateMovementProgress);
        addEventListener("resize", updateMovementProgress);
        updateMovementProgress();

        return () => {
            listScrollerRef.current?.removeEventListener("scroll", updateMovementProgress);
            removeEventListener("resize", updateMovementProgress);
        };
    }, [updateMovementProgress, listScrollerRef]);

    useEffect(updateMovementProgress, [updateMovementProgress, settings.sortKey, settings.sortOrder, settings.searchQuery]);

    return (
        <PetScrollerTransformContainer
            ref={containerRef}
            $rotation={rotation}
            $translation={translation}
            $animationLag={animationLag}
            $animationOvershoot={animationOvershoot}
            onClick={() => {
                switch (settings.clickAction) {
                    case ClickAction.Select:
                        if (selectedPets.has(pet)) {
                            setSelectedPets(new Set([...selectedPets].filter(newPet => newPet !== pet)));
                        } else {
                            setSelectedPets(new Set([...selectedPets, pet]));
                        }
                        break;

                    case ClickAction.ViewDetails:
                        history.pushState({}, "", `/pet/${pet.id}`);
                        setViewingPetInfo(pet);
                        break;
                }
            }}
        >
            <PetInteractionTransformContainer
                className="interaction-transform-container"
                $selected={selectedPets.has(pet)}
            >
                <PetImage src={pet.imageUrl} />

                <PetTextContainer
                    className="pet-text-container"
                >
                    <PetText className="pet-text">
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
                    </PetText>
                </PetTextContainer>
            </PetInteractionTransformContainer>
        </PetScrollerTransformContainer>
    );
};

/** Handles the transform of the pet entry due to the list scroll position */
//@ts-ignore
const PetScrollerTransformContainer = styled.div.attrs<{
    $rotation: number,
    $translation: number,
    $animationLag: number,
    $animationOvershoot: number,
    //@ts-ignore
}>(props => ({
    style: {
        "--rotation": `${props.$rotation}rad`,
        "--translation": `${props.$translation * innerHeight}px`,
        "--animation-lag": `${props.$animationLag}s`,
        "--animation-easing": `cubic-bezier(.2,${props.$animationLag},.4,1)`,
    },
}))`
--rotation: 0rad;
--translation: 0;
--animation-lag: 1s;
--animation-easing: cubic-bezier(.2,1.4,.4,1);

display: grid;

cursor: pointer;

user-select: none;

backface-visibility: hidden;
transform:
        translateZ(var(--translation))
        rotateX(var(--rotation));
transform-style: preserve-3d;

z-index: 0;

transition: z-index calc(var(--animation-lag) / 2) steps(1, end);
animation: ${fadeIn} var(--animation-lag) ease-out;

&:hover {
    z-index: 1;

    .interaction-transform-container {
        transform:
                scale(1.03125)
                rotateX(calc(-1 * var(--rotation)));

        img {
            transform: scale(1.125);
            filter: brightness(1.25);
        }
    
        .pet-text {
            gap: 0;
            margin-bottom: 0;
    
            transition:
                    gap 1s cubic-bezier(.4,1.25,.4,1),
                    margin-bottom .5s cubic-bezier(.2,1,.7,1);
        }
    }

    transition:
            transform 1s cubic-bezier(.2,1.4,.4,1),
            z-index 0.5s steps(1, start);
}

&:active {
    z-index: 1;

    .interaction-transform-container {
        transform:
                scale(0.9)
                rotateX(calc(-1 * var(--rotation)));

        img {
            transform: scale(1.25);
            filter: brightness(0.8);
        }
    }
}
`;

const selectedPulsate = keyframes`
0% {
    outline-color: #2f6f45;
}

50% {
    outline-color: #559bd9;
}

100% {
    outline-color: #c64a79;
}
`;

/** Handles the transform of the pet entry due to user pointer hover/click */
const PetInteractionTransformContainer = styled.div.attrs<{
    $selected: boolean,
}>(props => props)`
display: grid;
overflow: hidden;
border: ${props => props.$selected ? "2.5rem" : "0"} solid #0000;

outline-offset: -1.5rem;
outline: ${props => props.$selected ? "0.5rem" : "0"} solid;

border-radius: 6rem 4rem / 5rem 3rem;

backface-visibility: hidden;
transform: var(--selected-translation);
filter: brightness(${props => props.$selected ? "1.25": "1"});

transition:
        transform var(--animation-lag) var(--animation-easing),
        border .5s var(--animation-easing),
        outline .5s var(--animation-easing);
animation: ${selectedPulsate} 1s infinite alternate ease-in-out;
animation-play-state: ${props => props.$selected ? "running" : "paused"};

.pet-text-container {
    padding: ${props => props.$selected ? "1rem 1rem" : "1.5rem 1.5rem"};
}
`;

const PetImage = styled.img`
grid-area: 1/1;

align-self: stretch;
justify-self: stretch;
height: 100%;
width: 100%;
object-fit: cover;

transition:
        transform .5s cubic-bezier(.18,1.56,.44,.99),
        filter .125s ease-in-out;
`;

const PetTextContainer = styled.div`
grid-area: 1/1;

height: 100%;
display: flex;
align-items: stretch;

text-align: left;
color: #fff;
background: radial-gradient(ellipse at bottom left, #0000009f, #0000003f 60%, #0000);
z-index: 1;

transition: padding .5s ease-in-out;
`;

const PetText = styled.div`
display: flex;
flex-direction: column;
justify-content: end;
`;

const PetTitle = styled.h2`
font-size: 2rem;
line-height: 1;
margin: 0.5rem 0;
`;

const PetDesc = styled.div`
`;