"use client";
import { Button } from '@/components/ui/button'
import PodcastCard from '@/components/PodcastCard'
import { useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import LoaderSpinner from '@/components/LoaderSpinner';
import { useTranslations } from 'next-intl';


const Home = ()=>{
  const trendingPodcast = useQuery( api.podcasts.getTrendingPodcasts);
  const t = useTranslations('Home');

  if(!trendingPodcast) return <LoaderSpinner/>
  return(
    <div className='mt-9 flex flex-col gap-9 md:overflow-hidden'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-black-1 dark:text-white-1'>{t('title')}</h1>
        
        <div className="podcast_grid">
        {trendingPodcast?.map(({_id,podcastDescription,podcastTitle,imageUrl},index) =>{
          return (
            <PodcastCard
              key={_id}
              imgUrl={imageUrl!}
              title={podcastTitle}
              description={podcastDescription}
              index={index}
              podcastId={_id}
            />
          );
        })}
        </div>
      </section>
    </div>
  )
}

export default Home