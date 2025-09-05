"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Video, VideoOff, Users, MessageCircle, Heart, ShoppingCart, Loader2 } from "lucide-react"

interface LiveCommerceProps {
  artisanName: string
  productName: string
}

export function LiveCommerce({ artisanName, productName }: LiveCommerceProps) {
  const [isLive, setIsLive] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [viewers, setViewers] = useState(0)
  const [likes, setLikes] = useState(0)
  const [messages] = useState([
    { user: "Priya_K", message: "Beautiful work! How long does it take to make?" },
    { user: "Craft_Lover", message: "The detail is incredible!" },
    { user: "Heritage_Fan", message: "Can you show the back side?" },
  ])

  const handleStartStream = async () => {
    setIsStarting(true)
    // Simulate stream setup delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLive(true)
    setIsStarting(false)
    setViewers(Math.floor(Math.random() * 50) + 10)
  }

  const handleStopStream = () => {
    setIsLive(false)
    setViewers(0)
  }

  const handleLike = () => {
    setLikes((prev) => prev + 1)
  }

  return (
    <Card className="border-warm-brown/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-deep-teal">
          <div className="flex items-center">
            <Video className="w-5 h-5 mr-2" />
            Live Commerce
          </div>
          {isLive && (
            <Badge className="bg-warm-red text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2" />
              LIVE
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isLive ? (
          <div className="space-y-4">
            <Alert className="border-soft-blue/20 bg-soft-blue/5">
              <Video className="w-4 h-4" />
              <AlertDescription className="text-soft-blue">
                Start a live stream to showcase your craft-making process and interact with potential buyers in
                real-time.
              </AlertDescription>
            </Alert>

            <div className="bg-warm-brown/5 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <VideoOff className="w-8 h-8 text-warm-brown" />
              </div>
              <h3 className="font-medium text-deep-teal mb-2">Ready to go live?</h3>
              <p className="text-sm text-warm-brown mb-4">
                Share your craft story and demonstrate your techniques to engage with customers
              </p>
              <Button
                onClick={handleStartStream}
                disabled={isStarting}
                className="bg-warm-red text-white hover:bg-warm-red/90"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Starting Stream...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Start Live Stream
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mock Video Stream */}
            <div className="relative bg-deep-teal rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-deep-teal to-warm-brown flex items-center justify-center">
                <div className="text-center text-soft-cream">
                  <Video className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-lg font-medium">{artisanName}</p>
                  <p className="text-sm opacity-80">Demonstrating: {productName}</p>
                </div>
              </div>

              {/* Stream Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-warm-red text-white">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    LIVE
                  </Badge>
                  <div className="flex items-center text-white text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {viewers} watching
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLike} className="text-white hover:bg-white/20">
                  <Heart className="w-4 h-4 mr-1" />
                  {likes}
                </Button>
              </div>

              <div className="absolute bottom-4 right-4">
                <Button
                  onClick={handleStopStream}
                  variant="destructive"
                  size="sm"
                  className="bg-warm-red hover:bg-warm-red/90"
                >
                  <VideoOff className="w-4 h-4 mr-1" />
                  End Stream
                </Button>
              </div>
            </div>

            {/* Live Chat */}
            <div className="border border-warm-brown/20 rounded-lg p-4">
              <h4 className="font-medium text-deep-teal mb-3 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium text-heritage-gold">{msg.user}:</span>
                    <span className="text-warm-brown ml-2">{msg.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stream Actions */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
              <Button size="sm" className="flex-1 bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90">
                Buy Now - ₹15,000
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
