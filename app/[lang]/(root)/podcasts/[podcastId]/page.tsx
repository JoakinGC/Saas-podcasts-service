'use client'
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import PodcastDatailPlayer from "@/components/PodcastDatailPlayer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";


const PosdcastDetails = (
    {params:{podcastId,lang}}
    :
    {params:{podcastId: Id<"podcasts">,lang:string}}
) =>{
    const {user} = useUser();
    const t = useTranslations('PodcastDatil')
    const podcast = useQuery(api.podcasts.getPodcastById,{podcastId});
    const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType,{podcastId});
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if(!similarPodcasts || !podcast)return <LoaderSpinner/>
    
    const isOwner = isClient && user?.id === podcast?.authorId;
    return(
       <section className="flex w-full flex-col">
            <header className="mt-9 flex items-center justify-between">
                <h1 className="text-20 font-bold text-black-1 dark:text-white-1">
                    {t('title')}
                </h1>
                <figure className="flex gap-3">
                    <Image
                     src="/icons/headphone.svg"
                     width={24}
                     height={24}
                     alt={t('altImgHeadphones')}
                     className="invert dark:invert-0"
                    />
                    <h2 className="text-16 font-bold text-black-1 dark:text-white-1">{podcast?.view}</h2>

                </figure>
            </header>
            <PodcastDatailPlayer
                isOwner={isOwner}
                podcastId={podcast._id}
                audioStorageId={podcast.audioStorageId!}
                audioUrl={podcast.audioUrl!}
                author={podcast.author}
                authorId={podcast.authorId}
                authorImageUrl={podcast.authorImageUrl}
                imageStorageId={podcast.imageStorageId!}
                imageUrl={podcast.imageUrl!}
                podcastTitle={podcast.podcastTitle}
                key={podcast._id}
            />

                <p className="text-black-2 dark:text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
                    {podcast?.podcastDescription}
                </p>
                <div className="flex flex-col gap-8 ">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-18 font-bold text-black-1 dark:text-white-1">{t('transcription')}</h1>
                        <p className="text-16 font-medium text-black-2 dark:text-white-2">{podcast?.voicePrompt}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-18 font-bold text-black-1 dark:text-white-1">{t('thumbnailPrompt')}</h1>
                        <p className="text-16 font-medium text-black-2 dark:text-white-2">{podcast?.imagePrompt}</p>
                    </div>
                </div>
                <section className="mt-8 flex flex-col gap 5">
                    <h1 className="text-20 font-bold text-black-1 dark:text-white-1">{t('similarPodcasts')}</h1>

                    {similarPodcasts && similarPodcasts.length>0 ? (
                           <div className="podcast_grid">
                           {similarPodcasts?.map(({_id,podcastDescription,podcastTitle,imageUrl}) =>{
                             return (
                               <PodcastCard
                                 key={_id}
                                 imgUrl={imageUrl!}
                                 title={podcastTitle}
                                 description={podcastDescription}
                                 podcastId={_id}
                               />
                             );
                           })}
                           </div>
                    ):(
                        <>
                        <EmptyState
                           title="titlePodcastNotFound"
                           buttonLink="/discover"
                           buttonText="discoverMorePodcastButton"
                        />
                        </>
                    )}
                </section>

       </section>
    )
}

export default PosdcastDetails