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
import { usePathname, useRouter } from 'next/navigation'

type RecruiterModeContextValue = {
  isRecruiterMode: boolean
  toggleRecruiterMode: () => void
  setRecruiterMode: (value: boolean) => void
}

const defaultValue: RecruiterModeContextValue = {
  isRecruiterMode: false,
  toggleRecruiterMode: () => {},
  setRecruiterMode: () => {},
}

const RecruiterModeContext = createContext<RecruiterModeContextValue>(defaultValue)

const STORAGE_KEY = 'portfolio-recruiter-mode'

function readInitialMode(): boolean {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return params.get('mode') === 'recruiter' || sessionStorage.getItem(STORAGE_KEY) === 'true'
}

export function RecruiterModeProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isRecruiterMode, setIsRecruiterModeState] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setIsRecruiterModeState(readInitialMode())
    setHydrated(true)
  }, [])

  const syncUrl = useCallback(
    (enabled: boolean) => {
      const params = new URLSearchParams(window.location.search)
      if (enabled) {
        params.set('mode', 'recruiter')
      } else {
        params.delete('mode')
      }

      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [pathname, router],
  )

  const setRecruiterMode = useCallback(
    (value: boolean) => {
      setIsRecruiterModeState(value)
      sessionStorage.setItem(STORAGE_KEY, value ? 'true' : 'false')
      if (hydrated) syncUrl(value)
    },
    [hydrated, syncUrl],
  )

  const toggleRecruiterMode = useCallback(() => {
    setRecruiterMode(!isRecruiterMode)
  }, [isRecruiterMode, setRecruiterMode])

  const value = useMemo(
    () => ({
      isRecruiterMode: hydrated ? isRecruiterMode : false,
      toggleRecruiterMode,
      setRecruiterMode,
    }),
    [hydrated, isRecruiterMode, setRecruiterMode, toggleRecruiterMode],
  )

  return (
    <RecruiterModeContext.Provider value={value}>{children}</RecruiterModeContext.Provider>
  )
}

export function useRecruiterMode() {
  return useContext(RecruiterModeContext)
}
