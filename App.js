import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';
//font might not have been loaded for the first render cycle so it might cause a error so we dont fetch the font inside the the functional component
//we need to use AppLoading component from expo which will prolong the default loading screen to stay active untill a certin task of your choice is done
//this is the docs https://docs.expo.dev/versions/latest/sdk/app-loading/
// import { AppLoading } from 'expo';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
  //loadAsync is a method front the expo font package to load fonts
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  //create a new hook just for dataLoaded to know if the fonts are loaded initally its false, the id conditional returns AppLoading component from EXPO which takes a startAsync prop where we point at the operation we want to start when this is first rendered and that's of course our fetch fonts function.This has to be a function which you pass here and it has to be a function that returns a promise because expo will automatically listen to that promise for you and when the promise resolves, it will know that the loading is done and it will then call whatever you pass here to onFinish.
  //
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  //default component shown when the userNumber is undefined
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  //conditional to switch the component being show depending on the hook state
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
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
