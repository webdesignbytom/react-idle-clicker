import React, { useContext, useState } from 'react';
import { GameContext } from '../../../context/GameContext';

function Item({ item }) {
  // Player data from context
  const { playerCharacter, setPlayerCharacter } = useContext(GameContext);
  const [itemQuantity, setItemQuantity] = useState(0);

  const buyItem = (item) => {
    console.log('item', item);

    if (playerCharacter.totalScore >= item.cost) {
      console.log('totalscore', playerCharacter.totalScore);
      console.log('cost', item.cost);
      let character = playerCharacter;
      console.log('char', character);
      let newArray = character.items;
      console.log('newArray', newArray);

      const itemIndex = newArray.findIndex((i) => i.id === item.id);
      console.log('itemIndex', itemIndex);

      if (itemIndex !== -1) {
        newArray[itemIndex].quantity++;
      } else {
        newArray.push({
          ...item,
          quantity: 1,
        });
      }

      const pushArray = newArray;

      if (item.type === 'pointsPerClick') {
        // get current values
        let currentpointsPerClick = playerCharacter.pointsPerClick;
        let currentTotalScore = playerCharacter.totalScore;

        let newpointsPerClickValue = currentpointsPerClick + item.effect;
        let newTotalScore = currentTotalScore - item.cost;

        let purchaseAmount = 1;
        let newTotalItemsOwned =
          playerCharacter.totalItemsOwned + purchaseAmount;

        setPlayerCharacter({
          ...playerCharacter,
          pointsPerClick: newpointsPerClickValue,
          totalScore: newTotalScore,
          totalItemsOwned: newTotalItemsOwned,
          items: pushArray,
        });
      }

      if (item.type === 'pointsPerSecond') {
        let timerValue = true;
        let currentpointsPerSecond = playerCharacter.pointsPerSecond;
        console.log('currentpointsPerSecond', currentpointsPerSecond);
        let currentTotalScore = playerCharacter.totalScore;

        let newpointsPerSecondValue = currentpointsPerSecond + item.effect;
        let newTotalScore = currentTotalScore - item.cost;

        let purchaseAmount = 1;
        let newTotalItemsOwned =
          playerCharacter.totalItemsOwned + purchaseAmount;

        setPlayerCharacter({
          ...playerCharacter,
          pointsPerSecond: newpointsPerSecondValue,
          totalScore: newTotalScore,
          timer: timerValue,
          totalItemsOwned: newTotalItemsOwned,
          items: pushArray,
        });
      }
      const newTotalsArray = playerCharacter.items;
      console.log('newTotalsArray', newTotalsArray);
      const itemIdIndex = item.id - 1
      console.log('itemIdIndex', itemIdIndex);
    
      if (newTotalsArray.length >= 1) {
        let thisItem = newTotalsArray[itemIdIndex];
        console.log('thisItem', thisItem.name);
        let quantity = thisItem.quantity
        
      }

      setItemQuantity((prev) => prev + 1);
    } else {
      alert('You cannot afford to purchase');
    }
  };

  return (
    <div className='product'>
      <div className='inner__product'>
        <div className='product__image'>
          <div className='image__icon'>{item.image}</div>
        </div>

        <div className='product__data'>
          <div className='product__name'>
            <h6>Name: </h6>
            <span>{item.name}</span>
          </div>
          <div className='product__cost'>
            <h6>Cost: </h6>
            <span>£ {item.cost}</span>
          </div>
          <div className='product__type'>
            <h6>Type: </h6>
            <span>{item.type}</span>
          </div>
          <div className='product__effect'>
            <h6>Effect: </h6>
            <span>+ {item.effect}</span>
          </div>
        </div>

        <div className='purchase__product'>
          <div className='product__owned'>
            <h6>
              Owned: <span>{itemQuantity}</span>
            </h6>
          </div>
          <button onClick={() => buyItem(item)}>buy</button>
        </div>
      </div>
      <div className='product__desc'>{item.desc}</div>
    </div>
  );
}

export default Item;
