"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useAudio } from "@/providers/AudioProvider";
import { PodcastProps, ProfileCardProps } from "@/types";

import LoaderSpinner from "./LoaderSpinner";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

const ProfileCard = ({
  podcastData,
  imageUrl,
  userFirstName,
}: ProfileCardProps) => {
  const { setAudio } = useAudio();

  const [randomPodcast, setRandomPodcast] = useState<PodcastProps | null>(null);
  const t = useTranslations('profileCardComponent');

  const playRandomPodcast = () => {
    const randomIndex = Math.floor(Math.random() * podcastData.podcasts.length);

    setRandomPodcast(podcastData.podcasts[randomIndex]);
  };

  useEffect(() => {
    if (randomPodcast) {
      setAudio({
        title: randomPodcast.podcastTitle,
        audioUrl: randomPodcast.audioUrl || "",
        imageUrl: randomPodcast.imageUrl || "",
        author: randomPodcast.author,
        podcastId: randomPodcast._id,
      });
    }
  }, [randomPodcast, setAudio]);

  if (!imageUrl) return <LoaderSpinner />;

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={250}
        height={250}
        alt={t('altImgPodcaster')}
        className="aspect-square rounded-lg"
      />
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Image
              src="/icons/verified.svg"
              width={15}
              height={15}
              alt={t('verifiedAltImg')}
            />
            <h2 className="text-14 font-medium text-black-2 dark:text-white-2">
              {t('verified')}
            </h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-black-1 dark:text-white-1">
            {userFirstName}
          </h1>
        </div>
        <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt={t('altImgHeadphones')}
            className="invert dark:invert-0"
          />
          <h2 className="text-16 font-semibold text-black-1 dark:text-white-1">
            {podcastData?.listeners} &nbsp;
            <span className="font-normal text-black-2 dark:text-white-2">{t('listeners')}</span>
          </h2>
        </figure>
        {podcastData?.podcasts.length > 0 && (
          <Button
            onClick={playRandomPodcast}
            className="text-16 bg-orange-1 font-extrabold text-black-1 dark:text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt={t('altRandomPlay')}
            />{" "}
            &nbsp; {t('playRandomPodcast')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
