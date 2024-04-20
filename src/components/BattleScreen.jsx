import './battleScreen.css';

const BattleScreen = ({myPokemonSelection, computerRandomSelection, myHealth, enemyHealth}) => {

    return (
        <div className="battle-container">
            <div className="enemy-container">
                <div className='health-container'>
                    <p>Health: {enemyHealth}</p>
                    <div className="health-bar" style={{width: `${(enemyHealth/ 100)*100}%`}}></div>
                    <h1> {computerRandomSelection[0].name}</h1>
                </div>

                <img src={computerRandomSelection[0].sprites.front_default} alt='enemySelection'></img>
            </div>
            <div className="my-container">
                <img src={myPokemonSelection[0].sprites.back_default} alt='mySelection'></img>

                <div className='health-container'>
                    <p>Health: {myHealth}</p>
                    <div className="health-bar" style={{width: `${(myHealth/ 100)*100}%`}}></div>
                    <h1> {myPokemonSelection[0].name}</h1>

                </div>

            </div>
        </div>
    );
};

export default BattleScreen;