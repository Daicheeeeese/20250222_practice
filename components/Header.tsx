'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="site-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="site-title"
          >
            BBC English
          </Link>
          <nav>
            <Link 
              href="/reservations" 
              className="nav-link"
            >
              予約一覧
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 