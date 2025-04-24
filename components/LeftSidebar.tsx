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
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguajeSwitcher';



const LeftSideBar = () => {
  const locale = useLocale();
  const pathName = usePathname();
  const {audio} = useAudio();
  const t = useTranslations("Navbar");
  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px]",{
      "h-[calc(100vh-116px]": audio?.audioUrl
    })}>
        <nav className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-2 pr-2 max-lg:flex-col max-lg:gap-4 max-lg:items-center">
              <Link href={`/${locale}`} className="flex cursor-pointer items-center max-lg:justify-center">
                  <Image className="max-lg:m w-8 h-8" src="/icons/logo.svg" alt='logo' width={23} height={27} priority/>
                  <h1 className="text-24 font-extrabold text-black dark:text-white max-lg:hidden">Podcast</h1>
              </Link>
              <ThemeToggle/>
            </div>
            <div className="flex max-lg:flex-col items-center  pb-2">
              <LanguageSwitcher/>
            </div>
              {sidebarLinks.map(({route,label,imgURL}) =>{
                const fullRoute = `/${locale}${route}`;
                const isActive =
                  route === ""
                  ? pathName === `/${locale}` || pathName === `/${locale}/`
                  : pathName === fullRoute || pathName.startsWith(`${fullRoute}/`);

                return (
                  <Link href={fullRoute} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",{"bg-nav-focus border-r-4 border-orange-1": isActive})}>
                    <Image className="invert dark:invert-0" src={imgURL} alt={t(label)} width={24} height={24}/>
                    <p className="text-black-4 dark:text-white-4">{t(label)}</p>
                  </Link>
              )
            })}
        </nav>
          <SignInOutButton/>
    </section>
  )
}

export default LeftSideBar
