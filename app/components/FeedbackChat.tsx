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
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Feedback</h3>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white mb-4 flex-grow"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Provide feedback or suggest changes to the route..."
      />
      <button
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 font-semibold shadow-md transition duration-300 ease-in-out"
        onClick={handleSubmit}
        disabled={isLoading || !feedback.trim()}
      >
        {isLoading ? 'Sending...' : 'Send Feedback'}
      </button>
    </div>
  )
}
