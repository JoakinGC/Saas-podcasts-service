"use client"

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import SearchBar from "@/components/SearchBar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";


const Discover = ({searchParams:{search}} :{searchParams:{search:string}}) => {
    const podcastsData = useQuery(api.podcasts.getPodcastBySearch,{search:search || ""});

    return(
        <div className="flex flex-col gap-9">
            <SearchBar/>
            <div className="flex flex-col gap-9">
                <h1 className='text-20 font-bold text-black-1 dark:text-white-1'>
                    {!search ? 'Discover Trending Podcasts':
                    "Search result for: "}
                    {search && <span className="text-black-2 dark:text-white-2">{search}</span>}
                    </h1>
                {podcastsData ? (
                    <>
                        {podcastsData.length>0 ? (
                            <div className="podcast_grid">
                                {podcastsData?.map(({_id,podcastDescription,podcastTitle,imageUrl}) =>{
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
                        ):<EmptyState title="No resuls Found"/>}
                    </>
                ):<LoaderSpinner/>}
            </div>
        </div>
    )
}


export default Discover

