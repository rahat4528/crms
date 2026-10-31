"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThumbsUp, ThumbsDown, Star } from "lucide-react"

interface Review {
  id: number
  author: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
  size?: string
  color?: string
}

interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    title: "Perfect fit and beautiful quality",
    content:
      "I absolutely love this dress! The silk feels luxurious and the fit is perfect. I ordered a medium and it fits true to size. The color is exactly as shown in the photos.",
    date: "2025-01-15",
    verified: true,
    helpful: 12,
    size: "M",
    color: "Navy",
  },
  {
    id: 2,
    author: "Jennifer L.",
    rating: 4,
    title: "Great dress, runs slightly small",
    content:
      "Beautiful dress with excellent quality. I would recommend sizing up as it runs a bit small. The material is gorgeous and drapes well.",
    date: "2025-01-10",
    verified: true,
    helpful: 8,
    size: "L",
    color: "Black",
  },
  {
    id: 3,
    author: "Emma R.",
    rating: 5,
    title: "Exceeded expectations",
    content:
      "This dress is even more beautiful in person. The attention to detail is incredible and it's so comfortable to wear. Perfect for special occasions.",
    date: "2025-01-05",
    verified: false,
    helpful: 15,
    size: "S",
    color: "Burgundy",
  },
]

export function ProductReviews({ reviews = mockReviews, averageRating = 4.3, totalReviews = 24 }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState("newest")
  const [showWriteReview, setShowWriteReview] = useState(false)

  const ratingDistribution = [
    { stars: 5, count: 15, percentage: 62 },
    { stars: 4, count: 6, percentage: 25 },
    { stars: 3, count: 2, percentage: 8 },
    { stars: 2, count: 1, percentage: 4 },
    { stars: 1, count: 0, percentage: 0 },
  ]

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-light">{averageRating}</div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">Based on {totalReviews} reviews</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm">{item.stars}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
              <Progress value={item.percentage} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground w-8">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        <Button onClick={() => setShowWriteReview(!showWriteReview)}>
          {showWriteReview ? "Cancel" : "Write a Review"}
        </Button>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card>
          <CardHeader>
            <h4 className="text-lg font-medium">Write Your Review</h4>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Rating</Label>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Button key={i} variant="ghost" size="sm" className="p-1">
                    <Star className="h-5 w-5 text-gray-300 hover:text-yellow-400" />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="review-title">Review Title</Label>
              <input
                id="review-title"
                className="w-full mt-1 px-3 py-2 border border-input rounded-md"
                placeholder="Summarize your experience"
              />
            </div>
            <div>
              <Label htmlFor="review-content">Your Review</Label>
              <Textarea
                id="review-content"
                className="mt-1"
                placeholder="Share your thoughts about this product..."
                rows={4}
              />
            </div>
            <div className="flex gap-4">
              <Button>Submit Review</Button>
              <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{sortedReviews.length} reviews</div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.author}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                    {review.size && (
                      <>
                        <span>•</span>
                        <span>Size: {review.size}</span>
                      </>
                    )}
                    {review.color && (
                      <>
                        <span>•</span>
                        <span>Color: {review.color}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-muted-foreground mb-4">{review.content}</p>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Not Helpful
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
