import React, { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

const PickerContainer = (props) => {
  const scaleContainer = useRef(new Animated.Value(40)).current;

  const handlePressIn = () => {
    console.log("press in");
    Animated.timing(scaleContainer, {
      duration: 500,
      toValue: 100,
    }).start(()=>setTimeout(handlePressOut,5000));
  };

  const handlePressOut = () => {
    Animated.timing(scaleContainer, {
      duration: 500,
      toValue: 40,
    }).start();
    // console.log(scaleContainer);
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      // onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.container,
          {
            height: scaleContainer,
          },
        ]}
      >
        {props.children}
      </Animated.View>
      
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },
});
export default PickerContainer;
