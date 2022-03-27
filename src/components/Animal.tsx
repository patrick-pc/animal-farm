import { FC } from 'react'

interface AnimalProps {
  id: number
  type: string
  name: string
  age: number
}

const Animal: FC<AnimalProps> = ({ id, type, name, age }) => {
  return (
    <li key={id}>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  )
}

export default Animal
