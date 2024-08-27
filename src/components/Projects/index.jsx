import React, { useState, useLayoutEffect, useRef } from 'react';
import styles from './style.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { title: "Project XYZ 2024 MAR", src: "salar_de_atacama.jpg" },
  { title: "Project MNO ", src: "valle_de_la_muerte.jpeg" },
  { title: "Project MNO", src: "miscani_lake.jpeg" },
  { title: "Project MNO", src: "miniques_lagoon.jpg" },
];

export default function Index() {
  const [selectedProject, setSelectedProject] = useState(0);
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: imageContainerRef.current,
      pin: true,
      start: "top 10%",
      end: () => "+=" + (imageContainerRef.current.offsetHeight + 50),
      markers: false,
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.projects}>
      <div className={styles.projectDescription}>
        <div ref={imageContainerRef} className={styles.imageContainer}>
          <Image
            src={`/images/${projects[selectedProject].src}`}
            fill={true}
            alt="project image"
            priority={true}
          />
        </div>
        <div className={styles.column}>
          <p>Epic brands !!!<br/>
          Crafting tailored video advertisements and delivering powerful digital marketing solutions to elevate your brand.</p>
        </div>
        <div className={styles.column}>
          <p>epic stories!  <br/>
          We craft tailored video advertisements and deliver compelling digital marketing strategies that bring your brand's story to life.</p>
        </div>
      </div>

      <div className={styles.projectList}>
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseOver={() => setSelectedProject(index)}
            className={styles.projectEl}
          >
            <h4>{project.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
