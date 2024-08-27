'use client';

import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import styles from './style.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const phrases = [
    "Welcome to the Wild Side!",
    "At Lookout Studios",
    "we believe that the best ideas are the ones that make your heart race a little faster.",
    "We’re bold thinkers, wild dreamers, and those who refuse to settle for anything less than extraordinary."
];

export default function Index() {
    const background = useRef(null);
    const introImage = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: true,
                start: "top",
                end: "+=500px",
            },
        });

        timeline
            .from(background.current, { clipPath: `inset(15%)` })
            .to(introImage.current, { height: "200px" }, 0);
    }, []);

    return (
        <>
            {/* Insert the Masked Text Animation here */}
            <div className={styles.maskedTextContainer}>
                {phrases.map((_, index) => (
                    <MaskText key={index} index={index} />
                ))}
            </div>
            <div className={styles.homeHeader}>
                <div className={styles.backgroundImage} ref={background}>
                    <Image
                        src={'/images/background.jpeg'}
                        fill={true}
                        alt="background image"
                        priority={true}
                    />
                </div>
                <div className={styles.intro}>
                    <div ref={introImage} data-scroll data-scroll-speed="0.3" className={styles.introImage}>
                        <Image
                            src={'/images/intro.png'}
                            alt="intro image"
                            fill={true}
                            priority={true}
                        />
                    </div>
                    <h1 data-scroll data-scroll-speed="0.5"> We believe that your brand deserves to be epic, unforgettable, and just a little bit wild.</h1>
                </div>
            </div>
        </>
    );
}

function MaskText({ index }) {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    const [prevInView, setPrevInView] = useState(false);

    useEffect(() => {
        if (inView !== prevInView) {
            if (inView) {
                controls.start('enter');
            } else {
                controls.start('exit');
            }
            setPrevInView(inView);
        }
    }, [inView, prevInView, controls]);

    const animation = {
        initial: { y: "100%" },
        enter: i => ({
            y: "0",
            transition: {
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.075 * i
            }
        }),
        exit: i => ({
            y: "100%",
            transition: {
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.075 * i
            }
        })
    };

    return (
        <div ref={ref} className={styles.maskedText}>
            <motion.p
                custom={index}
                initial="initial"
                animate={controls}
                variants={animation}
            >
                {phrases[index]}
            </motion.p>
        </div>
    );
}
