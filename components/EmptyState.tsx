import { EmptyStateProps } from '@/types'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const EmptyState = ({
    title,
    buttonLink,
    search,
    buttonText,
}: EmptyStateProps ) => {
    const t = useTranslations('emptyState');
    return (
        <section className="flex-center size-full flex-col gap-3">
            <Image src="/icons/emptyState.svg" width={250} height={250} alt={t('emptyStateImg')} />
            <div className="flex-center w-full max-w-[254px] flex-col gap-3">
                <h1 className="text-16 text-center font-medium text-black-1 dark:text-white-1">{t(title)}</h1>
                {search && (
                    <p className="text-16 text-center font-medium text-black-2 dark:text-white-2">{t('try')}</p>
                )}
                {buttonLink && (
                    <Button className="bg-orange-1">
                        <Link href={buttonLink} className='gap-1 flex'>
                            <Image
                                src="/icons/discover.svg"
                                width={20}
                                height={20}
                                alt={t("discorverImg")}
                            />
                            <h1 className="text-16 font-extrabold text-black-1 dark:text-white-1">{t(buttonText||"")}</h1>
                        </Link>
                    </Button>
                )}
            </div>
        </section>
    )
}

export default EmptyState