import { FC } from 'react'
import { useAnimalSearch } from './hooks'
import Animal from './components/Animal'

const App: FC = () => {
  const { search, animals } = useAnimalSearch()

  return (
    <main className="flex flex-col">
      <h1 className="self-center flex-auto m-4 mt-8 text-4xl font-semibold">
        Animal Farm
      </h1>

      <input
        className="self-center flex-auto p-5 m-4 text-lg border-2 border-gray-400 rounded-lg"
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <ul className="self-center flex-auto m-4 text-lg">
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} />
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  )
}

export default App
