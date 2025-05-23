import LeftSideBar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RigthSidebar from "@/components/RightSidebar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import PodcastPlayer from "@/components/PodcastPlayer";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <div className="relative flex flex-col">
        <main className="relative flex bg-white-7  dark:bg-black-3">
            <LeftSideBar />
            <section className="border-2 border-red-500 flex min-h-screen  flex-1 flex-col px-4 sm:px-14">
              <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
                <div className="flex h-16 items-center justify-between md:hidden">
                  <Image
                    alt="menu icon" 
                    src="/icons/logo.svg"
                    width={30}
                    height={30}
                  />
                  <MobileNav/>
                </div>
                <div className="flex flex-col-md:pb-14">
                  <Toaster
                  />
                </div>
                <div className="flex flex-col-md:p">

                </div>
                {children}
              </div>
            </section>
            <RigthSidebar/>
        </main>
        <PodcastPlayer/>
    </div>
  );
}
