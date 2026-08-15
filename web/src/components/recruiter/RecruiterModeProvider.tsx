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

const defaultValue: RecruiterModeContextValue = {
  isRecruiterMode: false,
  isReady: false,
  toggleRecruiterMode: () => {},
  setRecruiterMode: () => {},
}

const RecruiterModeContext = createContext<RecruiterModeContextValue>(defaultValue)

const STORAGE_KEY = 'portfolio-recruiter-mode'

function readStoragePreference(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(STORAGE_KEY) === 'true'
}

function resolveRecruiterMode(urlMode: string | null): boolean {
  if (urlMode === 'recruiter') return true
  if (urlMode !== null) return false
  return readStoragePreference()
}

type RecruiterModeProviderProps = {
  children: ReactNode
  initialUrlMode?: string | null
}

export function RecruiterModeProvider({
  children,
  initialUrlMode = null,
}: RecruiterModeProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlMode = searchParams.get('mode') ?? initialUrlMode ?? null

  const [isRecruiterMode, setIsRecruiterModeState] = useState(() =>
    urlMode === 'recruiter' ? true : false,
  )
  const [isReady, setIsReady] = useState(() => urlMode !== null)

  useEffect(() => {
    const currentUrlMode = searchParams.get('mode') ?? initialUrlMode ?? null
    const resolved = resolveRecruiterMode(currentUrlMode)
    setIsRecruiterModeState(resolved)
    setIsReady(true)
  }, [initialUrlMode, searchParams])

  const syncUrl = useCallback(
    (enabled: boolean) => {
      const params = new URLSearchParams(searchParams.toString())
      if (enabled) {
        params.set('mode', 'recruiter')
      } else {
        params.delete('mode')
      }

      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  const setRecruiterMode = useCallback(
    (value: boolean) => {
      setIsRecruiterModeState(value)
      sessionStorage.setItem(STORAGE_KEY, value ? 'true' : 'false')
      setIsReady(true)
      syncUrl(value)
    },
    [syncUrl],
  )

  const toggleRecruiterMode = useCallback(() => {
    setRecruiterMode(!isRecruiterMode)
  }, [isRecruiterMode, setRecruiterMode])

  const value = useMemo(
    () => ({
      isRecruiterMode,
      isReady,
      toggleRecruiterMode,
      setRecruiterMode,
    }),
    [isRecruiterMode, isReady, setRecruiterMode, toggleRecruiterMode],
  )

  return (
    <RecruiterModeContext.Provider value={value}>{children}</RecruiterModeContext.Provider>
  )
}

export function useRecruiterMode() {
  return useContext(RecruiterModeContext)
}
