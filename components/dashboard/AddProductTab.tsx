"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, Sparkles, Eye, Loader2, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { VoiceInput } from "@/components/ai/VoiceInput"
import { CulturalAnalyzer } from "@/components/ai/CulturalAnalyzer"
import { LiveCommerce } from "@/components/ai/LiveCommerce"
import { enhanceWithAI, type AIEnhancementResult, type CulturalAnalysisResult } from "@/lib/ai-services"

export function AddProductTab() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    heritage_story: "",
  })
  const [images, setImages] = useState<File[]>([])
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [aiEnhancement, setAiEnhancement] = useState<AIEnhancementResult | null>(null)
  const [culturalAnalysis, setCulturalAnalysis] = useState<CulturalAnalysisResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const handleVoiceTranscription = (text: string, confidence: number) => {
    if (confidence > 0.8) {
      // High confidence - use as description
      setFormData((prev) => ({
        ...prev,
        description: text,
      }))
    } else {
      // Lower confidence - append to existing description
      setFormData((prev) => ({
        ...prev,
        description: prev.description ? `${prev.description} ${text}` : text,
      }))
    }
  }

  const handleAIEnhancement = async () => {
    if (!formData.description || !formData.category) return

    setIsEnhancing(true)
    try {
      const result = await enhanceWithAI(formData.description, formData.category, "Varanasi, UP")
      setAiEnhancement(result)
      setFormData((prev) => ({
        ...prev,
        description: result.enhanced_description,
        heritage_story: result.heritage_story,
      }))
    } catch (error) {
      console.error("AI enhancement failed:", error)
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleCulturalAnalysis = (result: CulturalAnalysisResult) => {
    setCulturalAnalysis(result)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission with AI-enhanced data
    const productData = {
      ...formData,
      images,
      ai_enhancement: aiEnhancement,
      cultural_analysis: culturalAnalysis,
    }
    console.log("Product data:", productData)
  }

  return (
    <div className="space-y-6">
      <Card className="border-warm-brown/20">
        <CardHeader>
          <CardTitle className="text-deep-teal flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Add New Product with AI Enhancement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label className="text-deep-teal">Product Images</Label>
              <div className="border-2 border-dashed border-warm-brown/30 rounded-lg p-6 text-center hover:border-heritage-gold transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-warm-brown mx-auto" />
                  <p className="text-warm-brown">
                    Drag and drop images here, or{" "}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-heritage-gold hover:underline"
                    >
                      browse files
                    </button>
                  </p>
                </div>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-warm-brown/20"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Cultural Heritage DNA Scanner */}
              <CulturalAnalyzer imageFile={images[0] || null} onAnalysisComplete={handleCulturalAnalysis} />
            </div>

            {/* Basic Product Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-deep-teal">
                  Product Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                  className="border-warm-brown/30 focus:border-heritage-gold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-deep-teal">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="border-warm-brown/30 focus:border-heritage-gold">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Textiles">Textiles & Fabrics</SelectItem>
                    <SelectItem value="Pottery">Pottery & Ceramics</SelectItem>
                    <SelectItem value="Jewelry">Jewelry & Ornaments</SelectItem>
                    <SelectItem value="Woodwork">Woodwork & Carving</SelectItem>
                    <SelectItem value="Metalwork">Metalwork</SelectItem>
                    <SelectItem value="Art">Paintings & Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-deep-teal">
                  Price (₹)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="Enter price"
                  className="border-warm-brown/30 focus:border-heritage-gold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-deep-teal">
                  Stock Quantity
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                  placeholder="Enter stock quantity"
                  className="border-warm-brown/30 focus:border-heritage-gold"
                />
              </div>
            </div>

            {/* Voice Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-deep-teal">Product Description</Label>
                <VoiceInput onTranscription={handleVoiceTranscription} />
              </div>

              <Textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your product, materials used, and crafting process..."
                rows={4}
                className="border-warm-brown/30 focus:border-heritage-gold"
              />

              {formData.description && !aiEnhancement && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAIEnhancement}
                  disabled={isEnhancing}
                  className="border-sunset-orange text-sunset-orange hover:bg-sunset-orange hover:text-white bg-transparent"
                >
                  {isEnhancing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enhancing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enhance with AI
                    </>
                  )}
                </Button>
              )}

              {aiEnhancement && (
                <Alert className="border-sage-green/20 bg-sage-green/5">
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription className="text-sage-green">
                    <div className="space-y-2">
                      <p className="font-medium">AI Enhancement Complete!</p>
                      <div className="flex flex-wrap gap-2">
                        {aiEnhancement.suggested_tags.map((tag) => (
                          <Badge key={tag} className="bg-heritage-gold text-deep-teal text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Heritage Story */}
            <div className="space-y-4">
              <Label className="text-deep-teal">Cultural Heritage Story</Label>
              <Textarea
                value={formData.heritage_story}
                onChange={(e) => setFormData((prev) => ({ ...prev, heritage_story: e.target.value }))}
                placeholder="Share the cultural significance and traditional techniques behind your craft..."
                rows={4}
                className="border-warm-brown/30 focus:border-heritage-gold"
              />
            </div>

            {/* Live Commerce Section */}
            {formData.name && <LiveCommerce artisanName="Priya Sharma" productName={formData.name} />}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1 bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90">
                Add Product
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-soft-cream bg-transparent"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
