'use client'
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import {  useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl';


const SignInOutButton = (
) => {
    const {signOut} = useClerk()
    const router = useRouter();
    const t = useTranslations('Navbar');
    const locale = useLocale();
    
      
    return (
        <div className="mt-auto flex flex-col gap-4 items-start w-full pb-6 max-lg:px-4 lg:pr-8">
            <SignedOut>
            <Button asChild className="w-full text-16 font-extrabold bg-orange-1">
                <Link href={`/sign-in`}>{t('signIn')}</Link>
            </Button>
            </SignedOut>

            <SignedIn>
            <Button
                className="w-full text-16 font-extrabold bg-orange-1"
                onClick={() => signOut(() => router.push(`/${locale}`))}
            >
                {t('logOut')}
            </Button>
            </SignedIn>
        </div>
    )
}

export default SignInOutButton