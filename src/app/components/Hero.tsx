"use client"

import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Hero = () => {
  const Data = {
    heroSection: {
      tag: 'Driven by performance',
      easyText: 'Soft trims and ',
      heroText: 'NVH solutions',
      easyText2: 'for seamless rides',
      video: '/hero/hero.mp4',
    }
  };

  const { tag, easyText, heroText, easyText2, video } = Data.heroSection;

  const sectionRef = useRef<HTMLElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    let rafId = 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis: any = new Lenis(({ duration: 1.2, smooth: true } as any))

    gsap.registerPlugin(ScrollTrigger)

    // connect Lenis and ScrollTrigger
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value)
          return
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
      // pinType based on transform support on the root element
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    })

    // make ScrollTrigger update on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    const section = sectionRef.current
    const overlay = overlayRef.current
    const videoEl = videoRef.current

    // subtle overlay parallax
    if (overlay && section) {
      gsap.to(overlay, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }

    // slight video scale on scroll for depth
    if (videoEl && section) {
      gsap.to(videoEl, {
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    ScrollTrigger.refresh()

    return () => {
      // cleanup
      ScrollTrigger.getAll().forEach((t) => t.kill())
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} className='relative w-full h-screen overflow-hidden'>
      <video
        ref={videoRef}
        className='absolute top-0 left-0 w-full h-full object-cover'
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
      <div ref={overlayRef} className='relative z-10 flex flex-col items-center justify-center h-full text-white text-center bg-black/60 px-4'>
        <span className='font-light pt-2 pb-3 text-lg xl:text-xl 2xl:text-[1.375rem] leading-snug'>
          {tag}
        </span>
        <h2 className='font-light leading-tight pb-2 text-3xl md:text-5xl'>
          <span className='font-semibold'>
            {easyText}
            <span className='text-[#00BFFF]'> {heroText}</span>
          </span>
          <br className='hidden md:block' />
          {easyText2}
        </h2>
      </div>
    </section>
  )
}

export default Hero
