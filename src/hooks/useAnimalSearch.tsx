import { useEffect, useState } from 'react'

interface Animal {
  id: number
  type: string
  name: string
  age: number
}

export const useAnimalSearch = (): {
  search: (q: any) => Promise<void>
  animals: Animal[]
} => {
  const [animals, setAnimals] = useState<Animal[]>([])

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery')
    search(lastQuery)
  }, [])

  const search = async (q: any) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    )
    const data = await response.json()
    setAnimals(data)

    localStorage.setItem('lastQuery', q)
  }

  return { search, animals }
}
