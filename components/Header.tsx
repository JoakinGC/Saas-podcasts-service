import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const Header = (
   {
    headerTitle, titleClassname
   }:{
    headerTitle?:string, titleClassname?:string
   }
) => {
  const t = useTranslations('headerComponet');
  return (
    <header className="flex itemas-center justify-between">
      {
        headerTitle ? (
          <h1 className={cn("text-18 font-bold text-black-1 dark:text-white-1",titleClassname)}>{t(headerTitle)}</h1>
        ): <div/>
      }
      <Link href="/discover" className="text-16 font-semibold text-orange-1">
        {t('seeAll')}
      </Link>
      
    </header>
  )
}

export default Header