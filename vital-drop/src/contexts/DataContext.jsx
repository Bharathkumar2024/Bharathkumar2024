import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialData } from '../data'

const DataContext = createContext(null)

const STORAGE_KEY = 'vital-drop-data'

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : initialData
    } catch {
      return initialData
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const value = useMemo(() => ({ data, setData }), [data])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
