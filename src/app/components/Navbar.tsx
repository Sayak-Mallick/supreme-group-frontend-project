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
              src='/logo.png'
              width={170}
              height={40}
              alt='Logo of Supreme Group'
              loading='eager'
            />
          </Link>
        </nav>
      </header>
    </>
  )
}

export default Navbar
