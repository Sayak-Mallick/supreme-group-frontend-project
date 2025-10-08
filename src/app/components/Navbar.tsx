'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState('translate-y-0');
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY) {
        setShowNavbar('-translate-y-[80px]'); // hide
      } else {
        setShowNavbar('translate-y-0 shadow-lg'); // show + shadow
      }
    } else {
      setShowNavbar('translate-y-0'); // always show near top
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    }
  }, [controlNavbar, lastScrollY]);

  return (
    <>
      <header className={`w-full h-[80px] bg-white fixed top-0 left-0 flex items-center justify-center transition-transform duration-300 z-50 ${showNavbar}`}>
        <nav className='main-container flex items-center justify-between py-2 xlg:py-1 mx-auto'>
          <Link href='/'>
            <Image
              src='https://supreme-group.vercel.app/static/media/logo.68f5b8493efb88f7cd65756bf67a1f5b.svg'
              width={170}
              height={40}
              alt='Logo of Supreme Group'
              loading='eager'
            />
          </Link>
          <ul className='hidden md:flex items-center gap-8 text-gray-700 font-medium'>
            <li className='text-lg'>
              <Link href='#solutions' className='hover:text-blue-600 transition-colors duration-300'>Solutions</Link>
              <Link href='#contact' className='ml-6 hover:text-blue-600 transition-colors duration-300'>Contact</Link>
            </li>
            <li>
              <Link href='https://supreme-group.in/careers' target='_blank' rel='noopener noreferrer' className='px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300'>Careers</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar
