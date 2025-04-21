'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const current = theme === 'system' ? systemTheme : theme
  const toggle  = () => setTheme(current === 'dark' ? 'light' : 'dark')

  return (
          <button
            aria-label="Cambiar tema"
            onClick={toggle}
            className="
              relative flex h-10 w-10 items-center justify-center
              rounded-full ring-1 ring-white/20 dark:ring-black/20
              bg-black/10 dark:bg-white/10
              text-white dark:text-black
              transition-all duration-300 ease-out
              hover:bg-orange-1/80 hover:scale-105 active:scale-95
              
            "
          >
            <Sun
              className="
                size-5 origin-center transition-transform duration-300
                dark:rotate-90 dark:scale-0
              "
            />
            <Moon
              className="
                absolute size-5 origin-center transition-transform duration-300
                rotate-90 scale-0 dark:rotate-0 dark:scale-100
              "
            />
          </button>
  )
}
