'use client'

import Map from '../components/Map'

export default function CreatePage() {
  console.log('Rendering CreatePage')
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
        />
      </div>
      <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Generate Route
      </button>
      <div className="h-[400px]">
        <Map />
      </div>
    </div>
  )
}
