import { Card, CardContent } from "@/components/ui/card"

export default function StoriesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-12 bg-muted rounded-lg mb-4 max-w-md mx-auto animate-pulse"></div>
          <div className="h-6 bg-muted rounded-lg max-w-2xl mx-auto animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="h-10 bg-muted rounded-lg flex-1 animate-pulse"></div>
          <div className="h-10 bg-muted rounded-lg w-full md:w-48 animate-pulse"></div>
        </div>

        <Card className="mb-8 animate-pulse">
          <div className="h-64 md:h-80 bg-muted"></div>
        </Card>

        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 h-32 bg-muted rounded-lg"></div>
                  <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                      <div className="h-5 bg-muted rounded w-20"></div>
                      <div className="h-5 bg-muted rounded w-16"></div>
                    </div>
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <div className="h-6 bg-muted rounded w-24"></div>
                        <div className="h-6 bg-muted rounded w-16"></div>
                      </div>
                      <div className="h-8 bg-muted rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
