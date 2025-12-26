import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [shuffleKey, setShuffleKey] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`);
      const data = await result.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const result = await fetch(pokemon.url);
          const details = await result.json();

          return {
            id: details.id,
            name: details.name,
            image: details.sprites.other["official-artwork"].front_default
          };
        })
      )
      setPokemons(detailedPokemons);
    }
    fetchPokemons();
  }, [offset])

  function handleShuffle() {
    console.log('shuffle')
    setShuffleKey(prev => prev + 1);
  }

  function handleRestart() {
    setOffset(Math.floor(Math.random() * 101));
  }

  return (
    <section>
      <h1>Memory Cards</h1>
      <PokeList list={pokemons} shuffleKey={shuffleKey} handleShuffle={handleShuffle} />
      <button onClick={handleRestart}>Restart Game</button>
      <button onClick={handleShuffle}>Shuffle</button>
    </section>
  )
}

function PokeList({ list, shuffleKey, handleShuffle }) {

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
        <Card pokemon={pokemon} key={pokemon} onClick={handleShuffle} />
      ))}
    </ul>
  )
}

function Card({ pokemon, onClick }) {
  return (
    <li onClick={onClick}>
      <img src={pokemon.image} alt="none" />
      <h3>{pokemon.name}</h3>
    </li>
  )
}

export default App