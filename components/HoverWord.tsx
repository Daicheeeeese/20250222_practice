'use client'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { useState } from 'react'
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/20/solid'

type Props = {
  word: string;
  data: {
    meaning: string;
    example: {
      en: string;
      ja: string;
    };
  };
}

type VoiceOption = {
  name: string;
  voiceId: string;
  flag: string;
};

const VOICE_OPTIONS: VoiceOption[] = [
  { name: 'US', voiceId: 'en-US-JennyNeural', flag: '🇺🇸' },
  { name: 'UK', voiceId: 'en-GB-SoniaNeural', flag: '🇬🇧' },
  { name: 'IN', voiceId: 'en-IN-NeerjaNeural', flag: '🇮🇳' },
];

export function HoverWord({ word, data }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>(VOICE_OPTIONS[0]);

  const playAudio = async (text: string) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    const speechConfig = speechsdk.SpeechConfig.fromSubscription(
      process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY!,
      process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION!
    );
    
    speechConfig.speechSynthesisVoiceName = selectedVoice.voiceId;
    
    const synthesizer = new speechsdk.SpeechSynthesizer(speechConfig);
    
    synthesizer.speakTextAsync(
      text,
      result => {
        synthesizer.close();
        setIsPlaying(false);
        
        if (result) {
          const { audioData } = result;
          synthesizer.close();
        }
      },
      error => {
        console.log(error);
        synthesizer.close();
        setIsPlaying(false);
      }
    );
  };

  const VoiceSelector = () => (
    <div className="flex gap-1">
      {VOICE_OPTIONS.map((voice) => (
        <button
          key={voice.voiceId}
          onClick={() => setSelectedVoice(voice)}
          className={`voice-selector-btn ${
            selectedVoice.voiceId === voice.voiceId ? 'active' : ''
          }`}
          title={`${voice.name} English`}
        >
          {voice.flag}
        </button>
      ))}
    </div>
  );

  const content = (
    <div className="p-3">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-bold text-base">{data.meaning}</span>
        <div className="flex items-center gap-2">
          <VoiceSelector />
          <button
            onClick={() => playAudio(word)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors ${
              isPlaying ? 'text-blue-500 bg-blue-50' : 'text-gray-500 hover:text-blue-500'
            }`}
            disabled={isPlaying}
            title={`${selectedVoice.name} 発音を再生`}
          >
            {isPlaying ? (
              <SpeakerWaveIcon className="w-5 h-5" />
            ) : (
              <SpeakerXMarkIcon className="w-5 h-5" />
            )}
            <span className="text-sm">発音</span>
          </button>
        </div>
      </div>
      <div className="text-sm">
        <div className="flex items-center gap-3 mb-2">
          <p className="text-gray-700">{data.example.en}</p>
          <div className="flex items-center gap-2">
            <VoiceSelector />
            <button
              onClick={() => playAudio(data.example.en)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors ${
                isPlaying ? 'text-blue-500 bg-blue-50' : 'text-gray-500 hover:text-blue-500'
              }`}
              disabled={isPlaying}
              title={`${selectedVoice.name} 例文の発音を再生`}
            >
              {isPlaying ? (
                <SpeakerWaveIcon className="w-5 h-5" />
              ) : (
                <SpeakerXMarkIcon className="w-5 h-5" />
              )}
              <span className="text-sm">発音</span>
            </button>
          </div>
        </div>
        <p className="text-gray-600">{data.example.ja}</p>
      </div>
    </div>
  );

  return (
    <Tippy 
      content={content}
      placement="bottom"
      arrow={true}
      animation="fade"
      delay={[100, 0]}
      theme="custom"
      interactive={true}
      maxWidth={400}
    >
      <span className="border-b border-dotted border-gray-400 cursor-help">
        {word}
      </span>
    </Tippy>
  )
} 