'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type RecruiterModeContextValue = {
  isRecruiterMode: boolean
  isReady: boolean
  toggleRecruiterMode: () => void
  setRecruiterMode: (value: boolean) => void
}

type RecruiterModeInternalValue = RecruiterModeContextValue & {
  applyResolvedMode: (value: boolean) => void
  markReady: () => void
}

const defaultValue: RecruiterModeContextValue = {
  isRecruiterMode: false,
  isReady: false,
  toggleRecruiterMode: () => {},
  setRecruiterMode: () => {},
}

const RecruiterModeContext = createContext<RecruiterModeInternalValue>({
  ...defaultValue,
  applyResolvedMode: () => {},
  markReady: () => {},
})

const STORAGE_KEY = 'portfolio-recruiter-mode'

function readStoragePreference(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(STORAGE_KEY) === 'true'
}

export function resolveRecruiterMode(urlMode: string | null): boolean {
  if (urlMode === 'recruiter') return true
  if (urlMode !== null) return false
  return readStoragePreference()
}

type RecruiterModeProviderProps = {
  children: ReactNode
}

export function RecruiterModeProvider({ children }: RecruiterModeProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isRecruiterMode, setIsRecruiterModeState] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const applyResolvedMode = useCallback((value: boolean) => {
    setIsRecruiterModeState(value)
  }, [])

  const markReady = useCallback(() => {
    setIsReady(true)
  }, [])

  const setRecruiterMode = useCallback(
    (value: boolean) => {
      setIsRecruiterModeState(value)
      sessionStorage.setItem(STORAGE_KEY, value ? 'true' : 'false')
      setIsReady(true)

      if (value) {
        if (pathname !== '/') {
          router.push('/?mode=recruiter')
          return
        }
        router.replace('/?mode=recruiter', { scroll: false })
        return
      }

      if (pathname === '/') {
        router.replace('/', { scroll: false })
        return
      }

      const params = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : '',
      )
      params.delete('mode')
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [pathname, router],
  )

  const toggleRecruiterMode = useCallback(() => {
    setRecruiterMode(!isRecruiterMode)
    if (pathname !== '/') return

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById('hero')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    })
  }, [isRecruiterMode, pathname, setRecruiterMode])

  const value = useMemo(
    () => ({
      isRecruiterMode,
      isReady,
      toggleRecruiterMode,
      setRecruiterMode,
      applyResolvedMode,
      markReady,
    }),
    [
      applyResolvedMode,
      isReady,
      isRecruiterMode,
      markReady,
      setRecruiterMode,
      toggleRecruiterMode,
    ],
  )

  return (
    <RecruiterModeContext.Provider value={value}>{children}</RecruiterModeContext.Provider>
  )
}

/** Syncs URL + sessionStorage into provider state. Must sit inside Suspense. */
export function RecruiterModeUrlSync() {
  const searchParams = useSearchParams()
  const { applyResolvedMode, markReady } = useContext(RecruiterModeContext)

  useEffect(() => {
    const urlMode = searchParams.get('mode')
    applyResolvedMode(resolveRecruiterMode(urlMode))
    markReady()
  }, [applyResolvedMode, markReady, searchParams])

  return null
}

export function useRecruiterMode(): RecruiterModeContextValue {
  const { isRecruiterMode, isReady, toggleRecruiterMode, setRecruiterMode } =
    useContext(RecruiterModeContext)
  return { isRecruiterMode, isReady, toggleRecruiterMode, setRecruiterMode }
}
