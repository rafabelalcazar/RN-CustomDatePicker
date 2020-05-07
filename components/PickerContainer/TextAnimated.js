import React, { useRef } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";

const TextAnimated = (props) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // console.log(pan.y);
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        opacity: pan.y.interpolate({
          inputRange: [-20, 0, 20],
          outputRange: [0, 1, 0],
        }),
        transform: [
          {
            translateY: pan.y,
          },
          {
            rotateX: pan.y.interpolate({
              inputRange: [-30, 0, 30],
              outputRange: [2, 0, 2],
            }),
          },
          {
            scale: pan.y.interpolate({
              inputRange: [-30, 0, 30],
              outputRange: [0.5, 1, 0.5],
            }),
          },
        ],
      }}
      {...panResponder.panHandlers}
    >
      {/* <Text>TextAnimated</Text> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default TextAnimated;
