import { Pet } from "$/Pet";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

/** Proportion of the scroller that it takes for an entry to appear from the bottom and disappear at the top */
const SCROLLER_PROPORTION = 0.65;

export const PetView = ({
    pet,
    listScrollerRef,
}: {
    pet: Pet,
    listScrollerRef: RefObject<HTMLDivElement>,
}) => {
    const [rotation, setRotation] = useState(0);
    const [translation, setTranslation] = useState(0);

    const spacerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateMovementProgress = () => {
            const topToBottomDistance = (listScrollerRef.current?.offsetHeight ?? 1) * SCROLLER_PROPORTION;

            const yProportion = (
                // center of the entry element
                (spacerRef.current?.offsetTop ?? 0)
                + (spacerRef.current?.offsetHeight ?? 0) / 2

                - (listScrollerRef.current?.scrollTop ?? 0)

                // centering
                - (listScrollerRef.current?.offsetHeight ?? 0) * (1 - SCROLLER_PROPORTION) / 2
            ) / topToBottomDistance;

            const yProportionClamped = Math.max(-1, Math.min(1, yProportion * 2 - 1));

            setRotation(-Math.asin(yProportionClamped**3));
            setTranslation(Math.sqrt(1 - yProportionClamped**4) - 1);
        };
        listScrollerRef.current?.addEventListener("scroll", updateMovementProgress);
        addEventListener("resize", updateMovementProgress);
        updateMovementProgress();

        return () => {
            listScrollerRef.current?.removeEventListener("scroll", updateMovementProgress);
            removeEventListener("resize", updateMovementProgress);
        };
    }, [listScrollerRef]);

    return (
        <GridSpaceCorrection ref={spacerRef}>
            <PetContainer
                $rotation={rotation}
                $translation={translation}
            >
                <PetImage src={pet.imageUrl} />

                <PetTextContainer>
                    <PetText className="pet-text">
                        <PetTitle>{pet.title}</PetTitle>
                        <PetDesc>{pet.desc}</PetDesc>
                    </PetText>
                </PetTextContainer>
            </PetContainer>
        </GridSpaceCorrection>
    );
};

const PetContainer = styled.div.attrs<{
    $rotation: number,
    $translation: number,
}>(props => ({
    style: {
        "--rotation": `${props.$rotation}rad`,
        "--translation": `${props.$translation * innerHeight}px`,
    },
}))`
--rotation: 0rad;
--translation: 0;

display: grid;
overflow: hidden;

border-radius: 6rem 4rem / 5rem 3rem;
cursor: pointer;

user-select: none;

// backface-visibility: hidden;
transform: translateZ(var(--translation)) rotateX(var(--rotation));

transition: transform 1s cubic-bezier(.2,1.4,.4,1);

&:hover {
    transform: scale(1.03125);

    > img {
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

&:active {
    transform: scale(0.9);

    > img {
        transform: scale(1.25);
        filter: brightness(0.8);
    }
}
`;

const PetImage = styled.img.attrs(({src}: {src: string}) => ({
    src,
}))`
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
--padding-bottom: 3rem;

grid-area: 1/1;

height: 100%;
padding: 2rem var(--padding-bottom);
display: flex;
align-items: stretch;

text-align: left;
color: #fff;
background: radial-gradient(ellipse at bottom left, #0000009f, #0000003f 60%, #0000);
z-index: 1;
`;

const PetText = styled.div`
display: flex;
flex-direction: column;
justify-content: end;

--text-desc-spacing: calc(1rem + var(--padding-bottom));

gap: var(--text-desc-spacing);
margin-bottom: calc(-1 * var(--text-desc-spacing) - 2em);


transition:
        gap .5s cubic-bezier(.5,0,.5,1),
        margin-bottom .5s ease-in-out;
`;

const PetTitle = styled.div`
font-weight: 700;
font-size: 2rem;
`;

const PetDesc = styled.div`
`;

const GridSpaceCorrection = styled.div`
width: 100%;
height: 100%;
display: grid;

perspective: 1000px;

`;