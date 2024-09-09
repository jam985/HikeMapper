'use client'

import { useState } from 'react'

interface FeedbackChatProps {
  onSendFeedback: (feedback: string) => void
  isLoading: boolean
}

export default function FeedbackChat({ onSendFeedback, isLoading }: FeedbackChatProps) {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = () => {
    if (feedback.trim()) {
      onSendFeedback(feedback)
      setFeedback('')
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Route Feedback</h3>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md text-foreground bg-background"
        rows={4}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Provide feedback or suggest changes to the route..."
      />
      <button
        className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/80 disabled:opacity-50 font-semibold shadow-md transition duration-300 ease-in-out"
        onClick={handleSubmit}
        disabled={isLoading || !feedback.trim()}
      >
        {isLoading ? 'Sending...' : 'Send Feedback'}
      </button>
    </div>
  )
}
