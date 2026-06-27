import { type ReactNode, useRef } from 'react';

import '../../styles/typography.css';

import gsap from 'gsap';

import { useGSAP } from '@gsap/react';

gsap.registerPlugin( useGSAP );

export default function Header () : ReactNode {

    const heading = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        gsap.from('span', {
            yPercent: 100,
            duration: 0.3,
            ease: "power1.out",
            stagger: { amount: 0.1 },
        });   
    },
        { scope : heading }
    );

    return (
        <h1 ref={heading}>
            <span>Your</span> <span>To</span> <span>Do</span>
        </h1>
    );
} 