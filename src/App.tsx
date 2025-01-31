import { useState, useEffect } from 'react'

import './App.css'


interface Pokemon {
  id: number,
  pokedexId: number,
  name: string,
  image: string,
  sprite: string,
  slug: string,
  stats: {
      HP: number,
      attack: number,
      defense: number,
      special_attack: number,
      special_defense: number,
      speed: number
  }
}


function CardPokemon({ pokemon, onClick }: { pokemon: Pokemon; onClick: () => void })
 {
  return (
    <article onClick={onClick} className="cardPokemon">
      <img src={pokemon.image} alt={pokemon.name} width={100} />
      <h3>{pokemon.name}</h3>
    </article>
  );
};



function ProfilPokemon({ pokemon }: { pokemon: Pokemon }) {
  return (
    <article className="profilPokemon">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} width={150} />
      <h3>Stats:</h3>
      <ul className="listStats">
        <li>HP: {pokemon.stats?.HP}</li>
        <li>Attack: {pokemon.stats?.attack}</li>
        <li>Defense: {pokemon.stats?.defense}</li>
        <li>Speed: {pokemon.stats?.speed}</li>
      </ul>
    </article>
  );
};




function App() {

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
  }, [theme]);

  function toggleTheme()  {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };



  useEffect(() => {
    
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/10")
      .then((response) => response.json())
      .then((data) => setPokemonList(data))
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, []);


  useEffect(() => {

    if (pokemon) {
      document.title = pokemon?.name;
    }


    return () => {
      document.title = "Pokedex";
    };
  }, [pokemon]);

  console.log(pokemonList)




  return (
    <>
      <div>
        <h1>Pokedex</h1>
        <button onClick={toggleTheme} className='buttonTheme'>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
        <div className="cardContainer">
          {pokemonList.map((p) => (
            <CardPokemon key={p.id} pokemon={p} onClick={() => setPokemon(p)} />
          ))}
        </div>
        {pokemon && <ProfilPokemon pokemon={pokemon} />}
      </div>
    </>
  )
}

export default App
