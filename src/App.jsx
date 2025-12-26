import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [offset, setOffset] = useState(0);

  function handleRefresh() {
    setOffset(Math.floor(Math.random() * 101));
  }

  return (
    <>
      <button onClick={handleRefresh}>Refresh</button>
      <PokeList offset={offset} />
    </>
  )
}

function PokeList({ offset }) {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results.map(p => p.name));
      })
  }, [offset]);

  return (
    <ul>
      {pokemons.map(pokemon => (
        <li key={pokemon}>{pokemon}</li>
      ))}
    </ul>
  )
}

export default App