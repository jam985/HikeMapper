'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  route: [number, number][]
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
    if (mapRef.current && route.length > 0) {
      console.log('Updating map with new route:', route)

      if (routeLayerRef.current) {
        routeLayerRef.current.remove()
      }

      routeLayerRef.current = L.polyline(route, { color: 'red' }).addTo(mapRef.current)
      mapRef.current.fitBounds(routeLayerRef.current.getBounds())

      // Add markers for start and end points
      L.marker(route[0]).addTo(mapRef.current).bindPopup('Start')
      L.marker(route[route.length - 1]).addTo(mapRef.current).bindPopup('End')
    }
  }, [route])

  return <div id="map" className="w-full h-full" />
}
