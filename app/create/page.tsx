'use client'

import { useState } from 'react'
import Map from '../components/Map'
import FeedbackChat from '../components/FeedbackChat'
import RouteInstructions from '../components/RouteInstructions'

interface RouteInstructions {
  steps: string[];
  landmarks: string[];
}

export default function CreatePage() {
  const [description, setDescription] = useState('')
  const [route, setRoute] = useState<[number, number][]>([])
  const [instructions, setInstructions] = useState<RouteInstructions | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false)

  const handleGenerateRoute = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setRoute(data.coordinates)
      setInstructions(data.instructions)
    } catch (error) {
      console.error('Failed to generate route:', error)
      // TODO: Add error handling UI
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendFeedback = async (feedback: string) => {
    setIsFeedbackLoading(true)
    try {
      const response = await fetch('/api/refine-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, route, feedback }),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setRoute(data.route)
    } catch (error) {
      console.error('Failed to refine route:', error)
      // TODO: Add error handling UI
    } finally {
      setIsFeedbackLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-full space-y-6">
        <div>
          <label htmlFor="route-description" className="block text-sm font-medium text-foreground mb-2">
            Describe your hiking route
          </label>
          <textarea
            id="route-description"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md text-foreground bg-background"
            placeholder="Enter a natural language description of your desired hiking route..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent/80 disabled:opacity-50 font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleGenerateRoute}
          disabled={isLoading || !description.trim()}
        >
          {isLoading ? 'Generating...' : 'Generate Route'}
        </button>
      </div>
      <div className="flex space-x-6">
        <div className="w-1/2">
          <div className="h-[400px]">
            <Map route={route} />
          </div>
          {instructions && <RouteInstructions instructions={instructions} />}
        </div>
        <div className="w-1/2">
          <FeedbackChat onSendFeedback={handleSendFeedback} isLoading={isFeedbackLoading} />
        </div>
      </div>
    </div>
  )
}
