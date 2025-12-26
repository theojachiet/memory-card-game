import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [shuffleKey, setShuffleKey] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results.map(p => p.name));
      })
  }, [offset])

  function handleShuffle() {
    setShuffleKey(prev => prev + 1);
  }

  function handleRestart() {
    setOffset(Math.floor(Math.random() * 101));
  }

  return (
    <section>
      <h1>Memory Cards</h1>
      <PokeList list={pokemons} shuffleKey={shuffleKey} />
      <button onClick={handleRestart}>Restart Game</button>
      <button onClick={handleShuffle}>Shuffle</button>
    </section>
  )
}

function PokeList({ list, shuffleKey }) {

  const [pokemonsDisplayed, setPokemonsDisplayed] = useState([]);

  useEffect(() => {
    if (list.length === 0) return;

    const shuffled = list.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 10);

    setPokemonsDisplayed(selected);
  }, [list, shuffleKey]);

  return (
    <ul>
      {pokemonsDisplayed.map(pokemon => (
        <Card name={pokemon} key={pokemon} />
      ))}
    </ul>
  )
}

function Card({ name }) {
  return (
    <li>{name}</li>
  )
}

export default App