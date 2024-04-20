import { Component, useEffect, useState } from 'react';
import './App.css';
import BattleScreen from './components/BattleScreen';
import ScreenPokemons from './components/ScreenPokemons';

function App() {

  const[pokemons, setPokemons] = useState('');
  const [position, setPosition] = useState(0);

  const [myPokemonSelection, setMyPokemonSelection] = useState([]);
  const [computerRandomSelection, setcomputerRandomSelection] = useState([]);

  const [startGame, setStartGame] = useState(false);

  const [myHealth, setMyHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);

  const pokeurl = "https://pokeapi.co/api/v2/pokemon/"

  const fetchData = async (pokeurl) => {
    const response = await fetch(pokeurl);
    const data = await response.json();
    return data;
  }

  const handleAttack = () =>{
    const myNewHealth = myHealth - computerRandomSelection[0].moves[0].attack;
    const enemyNewHealth = enemyHealth - myPokemonSelection[0].moves[0].attack;

    setMyHealth(myNewHealth);
    setEnemyHealth(enemyNewHealth);
  }

  const pokemonData = async (pokeurl)=>{
    const response = await fetchData(pokeurl);

    const dataPromises = response.results.map((poke) =>
      fetchData(pokeurl + '/' + poke.name
    ));

      const pokemonWithImages = await Promise.all(dataPromises);
      
      const addAttack = pokemonWithImages.map((pokemon) => {
        const attackValue = pokemon.moves.map((move) => ({
          ...move,
          attack: Math.floor(Math.random() * 50),
        }));
      return { ...pokemon, moves: attackValue};
  });

  //console.log(addAttack);
  setPokemons(addAttack);
};

  const handleSelection = (forward) =>{

    if(!forward && position <= 0) return;
    if(forward && position >= 20) return;
    if(!forward){
      setPosition(position - 1);
    } else{
      setPosition(position + 1);
    }

    //console.log(forward);
    //console.log(position);
  };

  const filterSelection = () =>{
    const mySelection = pokemons.filter((value,idx) => position === idx);
    setMyPokemonSelection(mySelection);
    //console.log(mySelection);
    //console.log(myPokemonSelection);

    getComputerSelection();
  }

  const getComputerSelection = () =>{
    const computerPosition = Math.floor(Math.random() * 20);
    const computerSelection = pokemons.filter((value,idx) => computerPosition === idx);

    setcomputerRandomSelection(computerSelection);
    //console.log(computerSelection);
  }

  const handleStart = () =>{
    setStartGame(true);
  }

  useEffect(() => {
    pokemonData(pokeurl);
  }, []);

  return (
    <>
      <div className='main-container'>
        <h1>Hola Mundo</h1>
      <div className='layout-game'>
        <div className='container-screen'>
          <div className='screen-layout'>
            {
              startGame ?(
                <BattleScreen 
                myPokemonSelection={myPokemonSelection}
                computerRandomSelection={computerRandomSelection}
                myHealth={myHealth}
                enemyHealth={enemyHealth}
                />
              ) :(

                pokemons && (<ScreenPokemons pokemons={pokemons} position={position}/>)
              )
              }
          </div>
        </div>

        <div className='buttons-container'>

          <div className='container-left-buttons'>
            <div className='container-pad'>
              <div className='container-d-pad'>
                <div className='container-d-pad-up'>
                  <button className='button-up'></button>
                </div>
                <div className='container-d-pad-left-and-right'>
                <div className='container-d-pad-left'>
                  <button className='button-left'
                  onClick={() => handleSelection(false)}
                  ></button>
                </div>
                <div className='container-d-pad-right'>
                  <button className='button-right' 
                  onClick={() => handleSelection(true)}></button>
                </div>
                </div>

                <div className='container-d-pad-down'>
                  <button className='button-down'></button>
                </div>
              </div>
            </div>

            <div className='container-joystick'>
              <div className='container-joystick-button'></div>
                <button className='joystick'></button>
            </div>
          </div>

          <div className='secondary-screen'>
            <div className='secondary-screen-layout'></div>
          </div>

          <div className='container-right-buttons'>
            <div className='container-action'>
            <div className='button-x-container'>
              <button className='button-x'>X</button>
            </div>
            <div className='button-y-and-a-container'>
              <div className='button-y-container'>
                <button className='button-y'>Y</button>
              </div>
              <div className='button-a-container'>
                <button className='button-a'
                onClick={() => filterSelection()}
                >A</button>
              </div>
            </div>
            <div className='button-b-container'>
              <button className='button-b' onClick={() => handleAttack()}>B</button>
            </div>

            </div>

            <div className='container-select'>
            <div className='container-start-button'>
              <button className='button-start' onClick={() => handleStart(true)}></button>
              <p>Start</p>
            </div>
            <div className='container-select-button'>
              <button className='button-select'></button>
              <p>Select</p>
            </div>
            </div>


          </div>

        </div>

      </div>
      </div>
    </>
  );
}

export default App;

//npm run dev para correr el proyecto