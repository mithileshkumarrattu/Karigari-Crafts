"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Sparkles, Award, MapPin, Clock, CheckCircle } from "lucide-react"
import { analyzeCulturalHeritage, type CulturalAnalysisResult } from "@/lib/ai-services"

interface CulturalAnalyzerProps {
  imageFile: File | null
  onAnalysisComplete: (result: CulturalAnalysisResult) => void
}

export function CulturalAnalyzer({ imageFile, onAnalysisComplete }: CulturalAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<CulturalAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!imageFile) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const result = await analyzeCulturalHeritage(imageFile)
      setAnalysis(result)
      onAnalysisComplete(result)
    } catch (err) {
      setError("Failed to analyze cultural heritage. Please try again.")
      console.error("Analysis error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (!imageFile) {
    return (
      <Alert className="border-warm-brown/20 bg-warm-brown/5">
        <AlertDescription className="text-warm-brown">
          Upload an image to enable Cultural Heritage DNA Scanner
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="w-full bg-sunset-orange text-white hover:bg-sunset-orange/90"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Analyzing Cultural Heritage...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Scan Cultural Heritage DNA
          </>
        )}
      </Button>

      {error && (
        <Alert className="border-warm-red/20 bg-warm-red/5">
          <AlertDescription className="text-warm-red">{error}</AlertDescription>
        </Alert>
      )}

      {analysis && (
        <Card className="border-heritage-gold/20 bg-heritage-gold/5">
          <CardHeader>
            <CardTitle className="flex items-center text-deep-teal">
              <CheckCircle className="w-5 h-5 mr-2 text-sage-green" />
              Cultural Heritage Analysis Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Authenticity Score */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-deep-teal">Authenticity Score:</span>
              <Badge className="bg-heritage-gold text-deep-teal text-lg px-3 py-1">
                <Award className="w-4 h-4 mr-1" />
                {analysis.authenticity_score}%
              </Badge>
            </div>

            {/* Regional Origin */}
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-sunset-orange" />
              <span className="font-medium text-deep-teal">Regional Origin:</span>
              <span className="text-warm-brown">{analysis.regional_origin}</span>
            </div>

            {/* Traditional Techniques */}
            <div>
              <h4 className="font-medium text-deep-teal mb-2">Traditional Techniques:</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.traditional_techniques.map((technique) => (
                  <Badge key={technique} variant="outline" className="border-sunset-orange/30 text-sunset-orange">
                    {technique}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cultural Timeline */}
            <div>
              <h4 className="font-medium text-deep-teal mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Cultural Timeline:
              </h4>
              <div className="space-y-2">
                {analysis.cultural_timeline.map((period, index) => (
                  <div key={index} className="text-sm text-warm-brown pl-4 border-l-2 border-heritage-gold/30">
                    {period}
                  </div>
                ))}
              </div>
            </div>

            {/* Heritage Significance */}
            <div>
              <h4 className="font-medium text-deep-teal mb-2">Heritage Significance:</h4>
              <p className="text-sm text-warm-brown leading-relaxed">{analysis.heritage_significance}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
