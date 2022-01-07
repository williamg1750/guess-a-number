import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  //default component shown when the userNumber is undefined
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  //conditional to switch the component being show depending on the hook state
  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
  }
  return (
    <View style={styles.screen}>
      <Header title='Guess A Number' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
