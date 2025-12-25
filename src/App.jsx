import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <PokeList />
    </>
  )
}

function PokeList() {
  let offset = Math.floor(Math.random() * (100 - 0 + 1))
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`)
    .then(function(response) {
      return response.json();
    })
    .then(function (response) {
      response.results.map(r => console.log(r.name))
    })
}

export default App