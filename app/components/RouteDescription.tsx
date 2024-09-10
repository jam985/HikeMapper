'use client'

import { useState, useEffect } from 'react'

interface RouteDescriptionProps {
  onGenerateRoute: (description: string) => void
  isLoading: boolean
}

export default function RouteDescription({ onGenerateRoute, isLoading }: RouteDescriptionProps) {
  const [description, setDescription] = useState('')

  useEffect(() => {
    console.log('RouteDescription component mounted')
    return () => {
      console.log('RouteDescription component unmounted')
    }
  }, [])

  useEffect(() => {
    console.log('RouteDescription isLoading changed:', isLoading)
  }, [isLoading])

  const handleSubmit = () => {
    if (description.trim()) {
      console.log('Generating route with description:', description)
      onGenerateRoute(description)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Describe your hiking route</h3>
      <textarea
        id="route-description"
        rows={6}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white mb-4 flex-grow"
        placeholder="Enter a natural language description of your desired hiking route..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50 font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleSubmit}
        disabled={isLoading || !description.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Route'}
      </button>
    </div>
  )
}
