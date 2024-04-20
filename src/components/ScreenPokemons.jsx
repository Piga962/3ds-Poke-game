import './screenpokemons.css';

const ScreenPokemons = ({pokemons, position}) => {
    //console.log({position});
    //console.log(pokemons);
    return(
        <div className="screen-container">
            {pokemons?.map((pokemon, idx) => (
                <div key={pokemon.id} 
                    className="pokemon-item"
                    style={{ backgroundColor: idx === position ? 'yellow' : 'transparent'}}>
                    <img src={pokemon.sprites.front_default} alt="pokemon image"/>
                    {pokemon.name}
                </div>
                ))}
        </div>
    );
};

export default ScreenPokemons;