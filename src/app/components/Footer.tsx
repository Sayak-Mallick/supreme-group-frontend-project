import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <footer className='relative text-gray-800'>
        <div className='absolute inset-0 -z-10'>
          <Image
            src='/footer.jpg'
            alt='Footer background'
            layout='fill'
            objectFit='cover'
            priority={false}
          />
        </div>
      </footer>
    </>
  )
}

export default Footer
