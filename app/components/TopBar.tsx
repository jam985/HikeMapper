'use client'

import { usePathname } from 'next/navigation'

export default function TopBar() {
  const pathname = usePathname()
  console.log('Rendering TopBar component, current path:', pathname)

  const getScreenName = () => {
    switch (pathname) {
      case '/create':
        return 'Create Hike'
      case '/my-hikes':
        return 'My Hikes'
      default:
        return 'Hike Mapper'
    }
  }

  return (
    <header className="bg-background shadow-sm p-4">
      <h1 className="text-2xl font-semibold text-foreground">{getScreenName()}</h1>
    </header>
  )
}
