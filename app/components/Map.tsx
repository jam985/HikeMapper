'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  route: [number, number][]
}

// Add this validation function
function isValidCoordinate(coord: [number, number]): boolean {
  return Array.isArray(coord) && coord.length === 2 && 
         typeof coord[0] === 'number' && typeof coord[1] === 'number' &&
         !isNaN(coord[0]) && !isNaN(coord[1]);
}

export default function Map({ route }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const routeLayerRef = useRef<L.Polyline | null>(null)

  useEffect(() => {
    console.log('Initializing Leaflet map')

    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([47.6052, -122.2294], 10)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current) {
      console.log('Updating map with new route:', route, typeof route)

      // Remove existing route layer
      if (routeLayerRef.current) {
        routeLayerRef.current.remove()
        routeLayerRef.current = null
      }

      // Filter out invalid coordinates
      const validRoute = route.filter(isValidCoordinate)

      if (validRoute.length > 0) {
        console.log('Valid route coordinates:', validRoute)

        if (validRoute.length >= 2) {
          // Create new polyline with valid coordinates
          routeLayerRef.current = L.polyline(validRoute, { color: 'red' }).addTo(mapRef.current)
          mapRef.current.fitBounds(routeLayerRef.current.getBounds())

          // Add markers for start and end points
          L.marker(validRoute[0]).addTo(mapRef.current).bindPopup('Start')
          L.marker(validRoute[validRoute.length - 1]).addTo(mapRef.current).bindPopup('End')
        } else {
          // If there's only one valid point, center the map on that point
          mapRef.current.setView(validRoute[0], 10)
          L.marker(validRoute[0]).addTo(mapRef.current).bindPopup('Location')
        }
      } else {
        console.error('No valid coordinates in the route')
      }
    } else {
      console.error('Map reference is not available')
    }
  }, [route])

  return <div id="map" className="w-full h-full" />
}
