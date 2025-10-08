import React from 'react'

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

  return (
     <section className='relative w-full h-screen overflow-hidden'>
      <video
        className='absolute top-0 left-0 w-full h-full object-cover'
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className='relative z-10 flex flex-col items-center justify-center h-full text-white text-center bg-black/60 px-4'>
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
