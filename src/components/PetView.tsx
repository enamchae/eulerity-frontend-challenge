import { Pet } from "$/Pet";
import { RefObject, useEffect, useRef, useState } from "react";
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
    const [animationLag, setAnimationLag] = useState(0);
    const [animationOvershoot, setAnimationOvershoot] = useState(0)

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setAnimationLag(Math.random() + 0.5);
        setAnimationOvershoot(Math.random() * 0.8 + 1.2);
    }, []);

    useEffect(() => {
        const updateMovementProgress = () => {
            const yProportion = (
                // center of the entry element
                (containerRef.current?.offsetTop ?? 0)
                + (containerRef.current?.offsetHeight ?? 0) / 2

                - (listScrollerRef.current?.scrollTop ?? 0)

                // centering
                - (listScrollerRef.current?.offsetHeight ?? 0) * (1 - SCROLLER_PROPORTION) / 2

                + (listScrollerRef.current?.offsetHeight ?? 0) / 2
            ) / ((listScrollerRef.current?.offsetHeight ?? 1) * SCROLLER_PROPORTION);

            const yProportionClamped = Math.tanh(yProportion * 2 - 1);

            setRotation(-Math.asin(yProportionClamped));
            setTranslation(Math.sqrt(1 - yProportionClamped**2) - 1);
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
        <PetContainer
            ref={containerRef}
            $rotation={rotation}
            $translation={translation}
            $animationLag={animationLag}
        >
            <PetImage src={pet.imageUrl} />

            <PetTextContainer>
                <PetText className="pet-text">
                    <PetTitle>{pet.title}</PetTitle>
                    <PetDesc>{pet.desc}</PetDesc>
                </PetText>
            </PetTextContainer>
        </PetContainer>
    );
};

const PetContainer = styled.div.attrs<{
    $rotation: number,
    $translation: number,
    $animationLag: number,
    $animationOvershoot: number,
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
overflow: hidden;

border-radius: 6rem 4rem / 5rem 3rem;
cursor: pointer;

user-select: none;

backface-visibility: hidden;
transform:
        translateZ(var(--translation))
        rotateX(var(--rotation));

z-index: 0;

transition:
        transform var(--animation-lag) var(--animation-easing),
        z-index var(--animation-lag) steps(1, end);
animation: fade-in var(--animation-lag) ease-out;

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

&:hover {
    z-index: 1;
    
    transform:
            scale(1.03125)
            translateZ(var(--translation));

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

    transition:
            transform 1s cubic-bezier(.2,1.4,.4,1),
            z-index 1s steps(1, start);
}

&:active {
    transform:
            scale(0.9)
            translateZ(var(--translation));

    > img {
        transform: scale(1.25);
        filter: brightness(0.8);
    }
    z-index: 1;
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

const PetTitle = styled.h2`
font-size: 2rem;
line-height: 1;
`;

const PetDesc = styled.div`
`;