import React from 'react';
import { View, StyleSheet } from 'react-native';

//since this is a template component we want to keep it generic as possiable. we removed some flex some styling from the style sheet copied from StartGameScreen.
//style={{...styles.card, ...props.style}} means that we spread the current styles in a object in the styles attribute and also spread the props.style if there is any. Since it comes in second it will over ride any existing style that is in conflict
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
