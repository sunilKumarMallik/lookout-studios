'use client';
import { projects } from './data';
import Card from "./Cards/index"
import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis'
import styles from './style.module.css';

export default function Services() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <>
      <main ref={container}>
        <div  className={styles.mainDiv}>
          <h1>The Good Stuff ................
          </h1>
          <p>Because you’re done with the dull, and so are we. <br/>You’re here because you want something different—something epic, something that makes people stop and say,<br/> <em>“Whoa, who did that?”</em>  
          </p>
          <p className={styles.endTag}>Think you can handle it?</p>
          </div>
          <div className={styles.headingTag}>
          <h1>Services</h1></div>
        {
          projects.map((project, i) => {
            const targetScale = 1 - ((projects.length - i) * 0.05);
            return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
          })
        }
      </main>
    </>

  )
}
