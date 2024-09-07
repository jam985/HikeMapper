'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  console.log('Rendering Sidebar component, current path:', pathname)

  return (
    <nav className="w-64 bg-gray-100 p-6">
      <div className="mb-8">
        {/* <img src="/images/logo.svg" alt="Hike Mapper Logo" className="w-32" /> */}
      </div>
      <ul className="space-y-4">
        <li>
          <Link href="/create" className={`block p-2 rounded ${pathname === '/create' ? 'bg-primary text-black' : 'text-foreground hover:bg-gray-200'}`}>
            Create
          </Link>
        </li>
        <li>
          <Link href="/my-hikes" className={`block p-2 rounded ${pathname === '/my-hikes' ? 'bg-primary text-black' : 'text-foreground hover:bg-gray-200'}`}>
            My Hikes
          </Link>
        </li>
      </ul>
    </nav>
  )
}
