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
    <section>
      <button onClick={handleRefresh}>Refresh</button>
      <PokeList offset={offset} />
    </section>
  )
}

function PokeList({ offset }) {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results.map(p => p.name));
      })
  }, [offset]);

  return (
    <ul>
      {pokemons.map(pokemon => (
        <Card name={pokemon} key={pokemon}/>
      ))}
    </ul>
  )
}

function Card({name}) {
  return (
    <li>{name}</li>
  )
}

export default App