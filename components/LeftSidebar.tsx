'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sidebarLinks } from "@/constants";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'
import { useAudio } from '@/providers/AudioProvider';
import ThemeToggle from './ThemeToggle';
import SignInOutButton from './SignInOutButton';
import { useLocale } from 'next-intl';



const LeftSideBar = () => {
  const locale = useLocale();
  const pathName = usePathname();
  const {audio} = useAudio();
  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px]",{
      "h-[calc(100vh-116px]": audio?.audioUrl
    })}>
        <nav className="flex flex-col gap-6">
          <div className="flex  gap-16 pb-10 max-lg:gap-8 max-lg:ml-8">
              <Link href="/" className="flex cursor-pointer items-center max-lg:justify-center">
                  <Image className="max-lg:m" src="/icons/logo.svg" alt='logo' width={23} height={27}/>
                  <h1 className="text-24 font-extrabold text-black dark:text-white max-lg:hidden">Podcast</h1>
              </Link>
              <ThemeToggle/>
            </div>
            

              {sidebarLinks.map(({route,label,imgURL}) =>{
                const fullRoute = `/${locale}${route}`;
                const isActive =
                  route === ""
                  ? pathName === `/${locale}` || pathName === `/${locale}/`
                  : pathName === fullRoute || pathName.startsWith(`${fullRoute}/`);

                return (
                  <Link href={fullRoute} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",{"bg-nav-focus border-r-4 border-orange-1": isActive})}>
                    <Image className="invert dark:invert-0" src={imgURL} alt={label} width={24} height={24}/>
                    <p className="text-black-4 dark:text-white-4">{label}</p>
                  </Link>
              )
            })}
        </nav>
          <SignInOutButton/>
    </section>
  )
}

export default LeftSideBar
