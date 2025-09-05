"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mic, MicOff, Loader2, Volume2 } from "lucide-react"
import { useVoiceRecording } from "@/hooks/useVoiceRecording"

interface VoiceInputProps {
  onTranscription: (text: string, confidence: number) => void
  disabled?: boolean
}

export function VoiceInput({ onTranscription, disabled = false }: VoiceInputProps) {
  const { isRecording, isProcessing, error, startRecording, stopRecording } = useVoiceRecording()
  const [lastTranscription, setLastTranscription] = useState<string>("")

  const handleToggleRecording = async () => {
    if (isRecording) {
      const result = await stopRecording()
      if (result) {
        setLastTranscription(result.text)
        onTranscription(result.text, result.confidence)
      }
    } else {
      await startRecording()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleToggleRecording}
          disabled={disabled || isProcessing}
          className={`${
            isRecording
              ? "border-warm-red text-warm-red hover:bg-warm-red hover:text-white"
              : "border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal"
          } bg-transparent transition-colors`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : isRecording ? (
            <>
              <MicOff className="w-4 h-4 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-2" />
              Start Voice Input
            </>
          )}
        </Button>

        {isRecording && (
          <div className="flex items-center space-x-2 text-warm-red">
            <div className="w-2 h-2 bg-warm-red rounded-full animate-pulse" />
            <span className="text-sm">Recording...</span>
          </div>
        )}
      </div>

      {error && (
        <Alert className="border-warm-red/20 bg-warm-red/5">
          <AlertDescription className="text-warm-red">{error}</AlertDescription>
        </Alert>
      )}

      {lastTranscription && (
        <Alert className="border-sage-green/20 bg-sage-green/5">
          <Volume2 className="w-4 h-4" />
          <AlertDescription className="text-sage-green">
            <div className="space-y-2">
              <p className="font-medium">Voice transcription completed:</p>
              <p className="text-sm italic">"{lastTranscription}"</p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
