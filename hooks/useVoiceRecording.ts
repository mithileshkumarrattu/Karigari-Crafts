"use client"

import { useState, useRef, useCallback } from "react"
import { convertVoiceToText, type VoiceToTextResult } from "@/lib/ai-services"

export function useVoiceRecording() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      setError("Failed to access microphone. Please check permissions.")
      console.error("Error starting recording:", err)
    }
  }, [])

  const stopRecording = useCallback((): Promise<VoiceToTextResult | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || !isRecording) {
        resolve(null)
        return
      }

      mediaRecorderRef.current.onstop = async () => {
        setIsRecording(false)
        setIsProcessing(true)

        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
          const result = await convertVoiceToText(audioBlob)
          resolve(result)
        } catch (err) {
          setError("Failed to process voice recording.")
          console.error("Error processing recording:", err)
          resolve(null)
        } finally {
          setIsProcessing(false)
        }
      }

      mediaRecorderRef.current.stop()

      // Stop all tracks to release microphone
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      }
    })
  }, [isRecording])

  return {
    isRecording,
    isProcessing,
    error,
    startRecording,
    stopRecording,
  }
}
