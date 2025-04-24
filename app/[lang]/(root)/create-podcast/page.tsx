"use client"
import React, { useReducer, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";


const voiceCategories = ['alloy','shimmer','nova','echo','fable','onyx']


const CreatePodcast = ()=>{
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('createPodcastPage');
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage">|null>(null);
  const [imageUrl, setImageUrl] = useState('')

  const [audioUrl, setAudioUrl] = useState<string>('')
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage">|null>(null);
  const [audioDuration, setAudioDuration] = useState(0)

  const [voiceType, setVoiceType] = useState<string>("");
  const [voicePrompt, setVoicePrompt] = useState('');

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const {toast} = useToast();

  const createPodcast = useMutation(api.podcasts.createPodcast);

  // 1. Define your form.
  const formSchema = z.object({
    podcastTitle: z.string().min(2,{message:t('titleRequired')}),
    podcastDescription: z.string().min(2,{message:t('descriptionRequired')}),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription:"",
    },
  })
 
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setSubmitting(true);
      if(!audioUrl || !imageUrl || !voiceType){
        toast({
          title:t('PleaseGenerate'),
        })
        setSubmitting(false);
        throw new Error('Please generate audio and image');
      }

      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views:0,
        audioDuration,
        audioStorageId:audioStorageId!,
        imageStorageId:imageStorageId!,

      })

      toast({
        title:t('titlePodcastCreate'),
      })

      setSubmitting(false);
      router.push(`/${locale}`);
    } catch (error) {
      console.error(error)
      toast({
        title:t('ErrorCreatedPodcast'),
        variant:'destructive'
      })
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-10 flex flex-col">
        <h1 className='text-20 font-bold  dark:text-white-1'>{t('title')}</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
        <div className="flex flex-col gap-[30px] border-b border-white-5 dark:border-black-5 pb-10">
        <FormField
          control={form.control}
          name="podcastTitle"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2.5">
              <FormLabel className="text-16 font-bold text-black-1 dark:text-white-1">{t('titleLabel')}</FormLabel>
              <FormControl>
                <Input 
                className="input-class focus-visible:ring-offset-orange-1"
                placeholder="Podcast" {...field} />
              </FormControl>
              <FormMessage 
              className="text-black-1 dark:text-white-1"/>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2.5">
          <Label className="text-16 font-bold  text-black-1 dark:text-white-1">
            {t('selectAIVoice')}
          </Label>
          <Select onValueChange={(value) => setVoiceType(value)}>
            <SelectTrigger className={cn('text-16 w-full border-none bg-white-1 dark:bg-black-1 text-gray-1')}>
              <SelectValue 
              placeholder={t('placeholderSelectAIVoice')} 
              className="placeholder:text-gray-1"
              />
            </SelectTrigger>
            <SelectContent
              className="text-16 border-none bg-white-1 dark:bg-black-1 font-bold text-black-1 dark:text-white-1 focus:ring-orange-1"
            >
             {voiceCategories.map((category) => (
              <SelectItem 
              key={category}
              value={category}
              className="capitalize focus:bg-orange-1">
                {category}
              </SelectItem>
             ))}
            </SelectContent>
            {voiceType && (
              <audio 
                src={`/${voiceType}.mp3`}
                autoPlay
                className="hidden"
              />
            )}
          </Select>

          <FormField
          control={form.control}
          name="podcastDescription"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2.5">
              <FormLabel className="text-16 font-bold text-black-1 dark:text-white-1">{t('descriptionForm')}</FormLabel>
              <FormControl>
                <Textarea
                className="input-class focus-visible:ring-offset-orange-1"
                placeholder={t('placeholderDescription')} {...field} />
              </FormControl>
              <FormMessage 
              className="text-black-1 dark:text-white-1"/>
            </FormItem>
          )}
        />
          </div>
        </div>
        <div className="flex flex-col pt-10">
          <GeneratePodcast
            setAudioStorageId={setAudioStorageId}
            setAudio={setAudioUrl}
            voiceType={voiceType}
            audio={audioUrl}
            voicePrompt={voicePrompt}
            setVoicePrompt={setVoicePrompt}
            setAudioDuration={setAudioDuration}
          />


          <GenerateThumbnail 
            image={imageUrl}
            imagePrompt={imagePrompt}
            setImage={setImageUrl}
            setImagePrompt={setImagePrompt}
            setImageStorageId={setImageStorageId}
          />

          <div className="mt-10 w-full">
            <Button type="submit"
            className="text-16 w-full bg-orange-1 py-4 font-extrabold text-black-1 dark:text-white-1 transition-all duration-500 hover:bg-white-1 dark:hover:bg-black-1">
              {isSubmitting ? (
                <>
                  {t('submitting')}
                  <Loader  size={20} 
                  className="animate-spin ml-2"/>
                </>
              ):(
                <span>{t('publish')}</span>
              )}
            </Button>
          </div>

        </div>
      </form>
    </Form>
    </section>
  )
}



export default CreatePodcast

