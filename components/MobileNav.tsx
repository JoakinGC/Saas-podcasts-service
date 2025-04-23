"use client"


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import SignInOutButton from "./SignInOutButton";
import LanguageSwitcher from "./LanguajeSwitcher";

const MobileNav = ()=>{
  const pathName = usePathname();
    return(
      <section>
        <Sheet>
          <SheetTrigger>
            <Image
              src="/icons/hamburger.svg"
              width={30}
              height={30}
              alt="menu"
              className="cursor-pointer"
            />
          </SheetTrigger>
            <SheetContent side="left"
            className="border-none bg-white-1 dark:bg-black-1">
              <div className="flex  gap-16 items-center pb-10">
                <Link href="/" className="flex cursor-pointer items-center gap-1">
                  <Image src="/icons/logo.svg" alt='logo' width={23} height={27}/>
                  <h1 className="text-24 font-extrabold text-black-1 dark:text-white-1 ml-2">Podcast</h1>
                </Link>
                <ThemeToggle/>
                <LanguageSwitcher/>
              </div>
              <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                <SheetClose asChild>
                  <nav className="flex h-full flex-col gap-6 text-black-1 dark:text-white-1">
                  {sidebarLinks.map(({route,label,imgURL}) =>{
                    const isActive = pathName === route || pathName.startsWith(`${route}/`);
                    return (
                      <SheetClose asChild key={route}><Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start",{"bg-nav-focus border-r-4 border-orange-1": isActive})}>
                        <Image src={imgURL} alt={label} width={24} height={24}/>
                        <p>{label}</p>
                      </Link>
                      </SheetClose>
                    )
                  })}
                  </nav>
                </SheetClose>
                <SheetClose>
                  <div className="mb-4">
                    <SignInOutButton/>
                  </div>
                </SheetClose>
              </div>
            </SheetContent>
        </Sheet>
      </section>
    )
  }
  
  export default MobileNav