import { GeneratePodcastProps } from '@/types';
import React, { useState } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {v4 as uuidv4} from 'uuid';
import { filterApi } from 'convex/server';
import { generateUploadUrl } from '@/convex/files';
import {useUploadFiles} from '@xixixao/uploadstuff/react';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';


const useGeneratePodcast = ({
  setAudio,voiceType,voicePrompt,setAudioStorageId
}:GeneratePodcastProps) =>{
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const generateUploadUrl =  useMutation(api.files.generateUploadUrl);
  const {startUpload} = useUploadFiles(generateUploadUrl);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);


  const getAudioUrl = useMutation(api.podcasts.getUrl);


  const generatePodcast = async () =>{
    setIsGenerating(true);
    setAudio('');

    if(!voicePrompt){
      toast({
        title: "Please provide a voiceType to generate a podcast",
      })
      return setIsGenerating(false);
    }


    try {
      const response = await getPodcastAudio({
        voice:voiceType,
        input:voicePrompt
      })

      const blob = new Blob([response],{type:'audio/mpeg'});
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob],fileName,{type: 'audio/mpeg'});


      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({storageId});
      toast({
        title: `Podcast generate successfully`,
      })
      setAudio(audioUrl!);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating podcast', error);

      toast({
        title: `Error generating podcasts`,
        variant:'destructive'
      })
      setIsGenerating(false);
      
    }
  }

  return{isGenerating,generatePodcast,}
}


const GeneratePodcast = (props:GeneratePodcastProps) => {
    const {isGenerating,generatePodcast} = useGeneratePodcast(props);
    const t = useTranslations('GeneratePodcastComponent');

    return (
    <div>
      <div className='flex flex-col gap-2.5'>
        <Label className="text-16 font-bold text-black-1 dark:text-white-1">
            {t('title')}
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder={t('placeholderGenerateAudio')}
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button type="submit"
            className="text-16 bg-orange-1 py-4 font-bold text-black-1 dark:text-white-1 transition-all "
            onClick={generatePodcast}
            >
              {isGenerating ? (
                <>
                  {t('generating')}
                  <Loader  size={20} 
                  className="animate-spin ml-2"/>
                </>
              ):(
                <span>{t('generate')}</span>
              )}
            </Button>
      </div>
      {props.audio&&(
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
        />
      )

      }
    </div>
  )
}

export default GeneratePodcast