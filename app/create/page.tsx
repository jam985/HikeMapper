'use client'

import { useState, useEffect } from 'react'
import Map from '../components/Map'
import FeedbackChat from '../components/FeedbackChat'
import RouteInstructions from '../components/RouteInstructions'
import RouteDescription from '../components/RouteDescription'

interface RouteInstructions {
  steps: string[];
  landmarks: string[];
}

export default function CreatePage() {
  const [route, setRoute] = useState<[number, number][]>([])
  const [instructions, setInstructions] = useState<RouteInstructions | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false)

  useEffect(() => {
    console.log('CreatePage component mounted')
    return () => {
      console.log('CreatePage component unmounted')
    }
  }, [])

  const handleGenerateRoute = async (description: string) => {
    console.log('Generating route with description:', description)
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
      console.log('Route generated successfully:', data)
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
    console.log('Sending feedback:', feedback, route)
    setIsFeedbackLoading(true)
    try {
      const response = await fetch('/api/refine-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: instructions, route, feedback }),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      console.log('Route refined successfully:', data)
      setRoute(data.route)
    } catch (error) {
      console.error('Failed to refine route:', error)
      // TODO: Add error handling UI
    } finally {
      setIsFeedbackLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <RouteDescription onGenerateRoute={handleGenerateRoute} isLoading={isLoading} />
        <FeedbackChat onSendFeedback={handleSendFeedback} isLoading={isFeedbackLoading} />
      </div>
      <div className="space-y-8">
        <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <Map route={route} />
        </div>
        {instructions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RouteInstructions instructions={instructions} />
          </div>
        )}
      </div>
    </div>
  )
}
