import { useEffect, useState } from 'react'

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
    <main className="flex flex-col">
      <h1 className="flex-auto self-center m-4 mt-8 text-4xl font-semibold">
        Animal Farm
      </h1>

      <input
        className="flex-auto self-center m-4 p-5 text-lg border-2 rounded-lg border-gray-400"
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <ul className="flex-auto self-center m-4 text-lg">
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
