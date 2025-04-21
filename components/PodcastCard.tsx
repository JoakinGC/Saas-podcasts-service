import { Id } from "@/convex/_generated/dataModel"
import { PodcastCardProps } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"


const PodcastCard = ({imgUrl,title,description,podcastId}
    :
    PodcastCardProps
) =>{
    const router = useRouter();

    const handleViews = () =>{

        router.push(`/podcasts/${podcastId}`,{
            scroll:true
        })
    }

    return(
    <div className="cursor-point" onClick={handleViews}>
        <figure className="flex flex-col gap-2">
            <Image
                alt={title}
                src={imgUrl!}
                width={174}
                height={174}
                className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
            />
            <div className="flex flex-col">
                <h1 className="text-16 truncate font-bold text-black-1 dark:text-white-1">{title}</h1>
                <h2 className="text-12 truncate font-normal capitalize text-black-4 dark:text-white-4">{description} </h2>
            </div>
        </figure>
    </div>
)
}


export default PodcastCard