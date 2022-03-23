import React, { useState, useRef } from 'react';
import { Text, View, Pressable } from 'react-native';
import styles from '../style/style';
import { MaterialCommunityIcons } from '@expo/vector-icons'

// declarering constants and some fnctions already 
// Const CASTS means the amount of throws the player have per round 
// Const reward is the possible bonus which the player is able to achieve
// const maximal_value is defined by the maximal volume of the dice / cube numbers

const CASTS = 3;
const REWARD = 63;
const MAXIMAL_VALUE = 6;
export default function Mainboard() {
  
  const [diceCondition, setdiceCondition] = useState([
    { value: '1', holding: false },
    { value: '2', holding: false },
    { value: '3', holding: false },
    { value: '4', holding: false },
    { value: '5', holding: false },
  ]);

  const [score, putScore] = useState([
    { value: '1', isSet: false, scoreTotal: 0 },
    { value: '2', isSet: false, scoreTotal: 0 },
    { value: '3', isSet: false, scoreTotal: 0 },
    { value: '4', isSet: false, scoreTotal: 0 },
    { value: '5', isSet: false, scoreTotal: 0 },
    { value: '6', isSet: false, scoreTotal: 0 },
  ]);



  const [restCasts, setRestCasts] = useState(CASTS);
  const [gameCondition, setGameCondition] = useState('Initial');
  const [gameStatus, setGameStatus] = useState('Throw dice');
  const scoreSum = useRef(0);
  // defining the scoreTotal const
  const scoreTotal = score.reduce((scoreTotal, score) => scoreTotal + score.scoreTotal, 0);

  
  
  function throwDice() {
    if(gameCondition === 'Initial'){
      setRestCasts(restCasts - 1);
      setGameCondition('Throwing');
      setGameStatus('Select and throw again');
      setdiceCondition(diceCondition.map(dice => {
        if (!dice.holding) {
          return { ...dice, value: Math.floor(Math.random() * MAXIMAL_VALUE) + 1 };
        } else {
          return dice;
        };
      }));
    } else if (gameCondition === 'Throwing'){
      if (restCasts > 1) {
        setRestCasts(restCasts - 1);
        setdiceCondition(diceCondition.map(dice => {
          if (!dice.holding) {
            return { ...dice, value: Math.floor(Math.random() * MAXIMAL_VALUE) + 1 };
          } else {
            return dice;
          };
        }));
      } else {
        setRestCasts(restCasts - 1);
        setdiceCondition(diceCondition.map(dice => {
          if (!dice.holding) {
            return { ...dice, value: Math.floor(Math.random() * MAXIMAL_VALUE) + 1 };
          } else {
            return dice;
          };
        }));
        setGameCondition('Assigning');
        setGameStatus('Pick up your points before the next round');
      };
    } else if (gameCondition === 'Win' || gameCondition === 'GameLost') {
      setGameCondition('Initial');
      setGameStatus('Throw dice');
      setRestCasts(CASTS);
      setdiceCondition([
        { value: '1', holding: false },
        { value: '2', holding: false },
        { value: '3', holding: false },
        { value: '4', holding: false },
        { value: '5', holding: false },
      ]);
      putScore([
        { value: '1', isSet: false, scoreTotal: 0 },
        { value: '2', isSet: false, scoreTotal: 0 },
        { value: '3', isSet: false, scoreTotal: 0 },
        { value: '4', isSet: false, scoreTotal: 0 },
        { value: '5', isSet: false, scoreTotal: 0 },
        { value: '6', isSet: false, scoreTotal: 0 },
      ]);
    };
  };
  
  function handleScorePress(diceIndex) { 
    if(gameCondition === 'Initial' || gameCondition === 'Throwing') {
      setGameStatus('You need to throw the cubes before collecting the points ! ');
    }
    if(gameCondition === 'Assigning' && score[diceIndex].isSet) {
      setGameStatus((diceIndex + 1) + ' is already added');
    } else {
      if(gameCondition === 'Assigning') {
        const newScore = score.reduce((newScore, score, index) => {
          const tempScore = { ...score };
          if(index === diceIndex) {
            const newValue = diceCondition.reduce((newValue, dice) => {
              if(dice.value === diceIndex + 1) {
                newValue += 1;
              };
              return newValue
            }, 0);
            tempScore.isSet = true;
            tempScore.scoreTotal = newValue * tempScore.value
          }
          newScore.push(tempScore);
          return newScore;
        }, []);
        putScore(newScore);
        scoreSum.current = newScore.reduce((scoreTotal, score) => scoreTotal + score.scoreTotal, 0)
        const isReward = scoreSum.current >= REWARD;
        if(isReward) {
          if(scoreSum.current >= REWARD){
            setGameStatus('WINNER!');
            setGameCondition('Win')
          } else {
            setGameStatus('GAME LOST!');
            setGameCondition('GameLost')
          }
        } else {
          if(newScore.every(score => score.isSet)) {
            if(scoreSum.current >= REWARD){
              setGameStatus('WINNER!');
              setGameCondition('Win');
            } else {
              setGameStatus('GAME LOST!');
              setGameCondition('GameLost')
            }
          } else {
            setGameCondition('Initial');
            setGameStatus('Throw dice');
            setRestCasts(CASTS);
            setdiceCondition([
              { value: '1', holding: false },
              { value: '2', holding: false },
              { value: '3', holding: false },
              { value: '4', holding: false },
              { value: '5', holding: false },
            ]);
          };
        };
      };
    };
  };

  function renderDice(){
    return diceCondition.map((dice, index) => (
      <Pressable
      key={index}
      onPress={() => handleDicePress(index) }
      >
        <MaterialCommunityIcons
          name={"dice-" + dice.value}
          size={50}
          color={dice.holding ? 'grey' : 'black'}
          />
      </Pressable>
    ));
  };

  function handleDicePress(index) {
    if(gameCondition === 'Throwing' || gameCondition === 'Assigning') {
      const newdiceCondition = [...diceCondition];
      newdiceCondition[index].holding = !newdiceCondition[index].holding;
      setdiceCondition(newdiceCondition);
    };
  };


  
  function renderScore(){
    return (
      <View style={styles.selection}>
      {score.map((score, index) => (
        <Pressable
          key={'score-' + index}
          onPress={() => handleScorePress(index)}
        >
          <Text style={styles.scoreText}>{score.scoreTotal}</Text>
          <MaterialCommunityIcons
            key={'number-' + index}
            name={"numeric-" + (index + 1) + "-circle"}
            size={50}
            color={score.isSet ? 'grey' : 'black'}
          />
        </Pressable>
      ))}
    </View>
    );
  };


  return (
    <View style={styles.mainboardContainer}>
      <View style={styles.diceRow}>
        {gameCondition === 'Initial' ? null : renderDice()}
      </View>
      <Text style={styles.scoreText}>Score: {scoreTotal}</Text>
      <Text style={styles.text}>Casts left: {restCasts}</Text>
      <Text style={styles.status}>{gameStatus}</Text>
      <Text style={styles.text}>{gameCondition === 'Win' ? 'REWARD reached!' : "You are " + (REWARD - scoreTotal) + " points from reward" }</Text>
      <Pressable
        style={styles.button}
        onPress={throwDice}
      >
        <Text style={styles.buttonText}>THROW CUBES</Text>
      </Pressable>
      {renderScore()}
    </View>
  );
}