"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ThumbsUp } from "lucide-react"

interface QAItem {
  id: number
  question: string
  answer?: string
  author: string
  date: string
  helpful: number
  isStoreAnswer?: boolean
}

const mockQA: QAItem[] = [
  {
    id: 1,
    question: "What is the fabric composition of this dress?",
    answer:
      "This dress is made from 100% mulberry silk with a smooth, luxurious finish. It's naturally breathable and has a beautiful drape.",
    author: "Sarah K.",
    date: "2025-01-12",
    helpful: 8,
    isStoreAnswer: true,
  },
  {
    id: 2,
    question: "How does this dress fit compared to other brands? Should I size up?",
    answer:
      "The dress fits true to size in my experience. I'm usually a medium in most brands and the medium fit perfectly. The cut is flattering and not too tight.",
    author: "Emma R.",
    date: "2025-01-10",
    helpful: 12,
  },
  {
    id: 3,
    question: "Is this dress suitable for machine washing?",
    answer:
      "We recommend dry cleaning for best results, but gentle hand washing in cold water is also acceptable. Please avoid machine washing to preserve the silk quality.",
    author: "Customer Service",
    date: "2025-01-08",
    helpful: 15,
    isStoreAnswer: true,
  },
  {
    id: 4,
    question: "What occasions would this dress be appropriate for?",
    date: "2025-01-15",
    author: "Jennifer M.",
    helpful: 0,
  },
]

export function ProductQA() {
  const [showAskQuestion, setShowAskQuestion] = useState(false)
  const [question, setQuestion] = useState("")

  const handleSubmitQuestion = () => {
    // Handle question submission
    setQuestion("")
    setShowAskQuestion(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Questions & Answers</h3>
        <Button onClick={() => setShowAskQuestion(!showAskQuestion)}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Ask a Question
        </Button>
      </div>

      {/* Ask Question Form */}
      {showAskQuestion && (
        <Card>
          <CardHeader>
            <h4 className="text-lg font-medium">Ask a Question</h4>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="question">Your Question</Label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about sizing, materials, care instructions, or anything else..."
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleSubmitQuestion} disabled={!question.trim()}>
                Submit Question
              </Button>
              <Button variant="outline" onClick={() => setShowAskQuestion(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Q&A List */}
      <div className="space-y-4">
        {mockQA.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Question */}
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <MessageCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{item.question}</p>
                      <div className="text-sm text-muted-foreground mt-1">
                        Asked by {item.author} on {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answer */}
                {item.answer && (
                  <div className="ml-7 pl-4 border-l-2 border-muted">
                    <div className="flex items-start gap-2 mb-2">
                      {item.isStoreAnswer && (
                        <Badge variant="secondary" className="text-xs">
                          Store Answer
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{item.answer}</p>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({item.helpful})
                    </Button>
                  </div>
                )}

                {/* Unanswered */}
                {!item.answer && (
                  <div className="ml-7 pl-4 border-l-2 border-muted">
                    <p className="text-sm text-muted-foreground italic">
                      This question hasn't been answered yet. Be the first to answer!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockQA.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium mb-2">No questions yet</h4>
          <p className="text-muted-foreground mb-4">Be the first to ask a question about this product.</p>
          <Button onClick={() => setShowAskQuestion(true)}>Ask the First Question</Button>
        </div>
      )}
    </div>
  )
}
