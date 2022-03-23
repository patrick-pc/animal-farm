import { useEffect, useState } from 'react'
import './App.css'

function useAnimalSearch() {
  interface Test {
    id: number
    type: string
    name: string
    age: number
  }
  const [animals, setAnimals] = useState<Test[]>([])

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

function App() {
  const { search, animals } = useAnimalSearch()

  return (
    <main>
      <h1>Animal Farm</h1>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <strong>{animal.type}</strong> {animal.name} ({animal.age} years
            old)
          </li>
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  )
}

export default App
