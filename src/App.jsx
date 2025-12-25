import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let offset;

  function handleRefresh() {
    console.log('click');
    offset = Math.floor(Math.random() * (100 - 0 + 1))
  }

  return (
    <>
      <button onClick={handleRefresh}>Refresh</button>
      <PokeList offset={offset} />
    </>
  )
}

function PokeList({ offset }) {
  let presentationArray = [];
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      response.results.map(r => presentationArray.push(r.name))
    })
    .then(function (response) {
      const listItems = presentationArray.map(pokemon =>
        <li key={pokemon}>pokemon</li>
      )
    })
    .then(function (response) {
      return (
        <ul>
          {listItems}
        </ul>
      )
    })
}

export default App