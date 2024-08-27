'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css'
import Intro from '../components/Intro';
import Description from '../components/Description';
import Projects from '../components/Projects';
import Header from '@/components/Header';
import StickyCursor from '@/components/StickyCursor';
import ZoomParallax from '@/components/ZoomParallax';
import Services from '@/components/Services';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader';
import Landing from '@/components/Landing';
import About from '@/components/About';
import Epic from '@/components/Epic';
import SlidingImages from '@/components/SlidingImages';
import Contact from '@/components/Contact';
export default function Home() {

  const stickyElement = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        const locomotiveScroll = new LocomotiveScroll();

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default'
          window.scrollTo(0, 0);
        }, 2000)
      }
    )()
  }, [])
  return (
    <>
      <main className={styles.main}>
        <AnimatePresence mode='wait'>
          {isLoading && <Preloader />}
        </AnimatePresence>
        <Landing />
        <Header ref={stickyElement} />
        <StickyCursor stickyElement={stickyElement} />
        <Intro />
        <Description />
        <Projects />
        <About />
        <Services />
        <ZoomParallax />
        <Epic />
        <SlidingImages />
        <Contact />
      </main>
    </>
  )
}
