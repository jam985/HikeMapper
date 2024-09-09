'use client'

import { useState } from 'react'
import Map from '../components/Map'

export default function CreatePage() {
  const [description, setDescription] = useState('')
  const [route, setRoute] = useState<[number, number][]>([])
  const [isLoading, setIsLoading] = useState(false)

  console.log('Rendering CreatePage')

  const handleGenerateRoute = async () => {
    console.log('Generating route for description:', description)
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate route')
      }

      const data = await response.json()
      console.log('Received route data:', data)
      setRoute(JSON.parse(data.route))
    } catch (error) {
      console.error('Error generating route:', error)
      // TODO: Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
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
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleGenerateRoute}
        disabled={isLoading || !description.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Route'}
      </button>
      <div className="h-[400px]">
        <Map route={route} />
      </div>
    </div>
  )
}
