import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { PodcastCardProps } from "@/types";

export default function PodcastCard({
  imgUrl,
  title,
  description,
  podcastId,
  index
}: PodcastCardProps) {
  const router  = useRouter();
  const locale  = useLocale();

  const goToPodcast = () =>
    router.push(`/${locale}/podcasts/${podcastId}`, { scroll: true });

  return (
    <div onClick={goToPodcast} className="cursor-pointer">
      <figure className="relative w-full rounded-xl overflow-hidden">
        <div className="aspect-square w-full 2xl:w-[200px]" />
        <Image
          src={imgUrl}
          alt={title}
          fill            
          priority={index===0}          
          sizes="(max-width: 768px) 50vw, 174px"
          className="object-cover rounded-xl"
        />
      </figure>
      <div className="mt-2 flex flex-col">
        <h1 className="text-16 truncate font-bold text-black-1 dark:text-white-1">
          {title}
        </h1>
        <h2 className="text-12 truncate font-normal capitalize text-black-4 dark:text-white-4">
          {description}
        </h2>
      </div>
    </div>
  );
}
