import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import BonusMultiplier from '../bonusMultiplier/BonusMultiplier';
import './clicker.css';

function Clicker() {
  const { playerCharacter, setPlayerCharacter } = useContext(GameContext);

  const clickButton = () => {
    let newPPC = playerCharacter.ppc;
    let currentTotalScore = playerCharacter.totalScore;
    let currentMultiplier = playerCharacter.bonusMultiplier;
    let newTotalScore = newPPC * currentMultiplier + currentTotalScore;

    setPlayerCharacter({
      ...playerCharacter,
      totalScore: newTotalScore,
    });
  };

  return (
    <>
      <section className='clicker__container'>
        <button onClick={clickButton}>CLICK ME</button>
        <BonusMultiplier />
      </section>
    </>
  );
}

export default Clicker;
