import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, PanResponder, Animated } from "react-native";
import moment from "moment";

// const DAYS = () => {
//   const days = [];
//   const dateStart = moment();
//   const dateEnd = moment().add(8, "days");
//   while (dateEnd.diff(dateStart, "days") >= 0) {
//     days.push(dateStart.format("D"));
//     dateStart.add(1, "days");
//   }
//   return days;
// };
// console.log(DAYS());
// console.log(moment("20111032", "YYYYMMDD").calendar());

const Calendar = (props) => {
  //   const [YAnimation, setYAnimation] = useState(new Animated.Value());

  //   useEffect(() => {
  //     const rpanResponder = PanResponder.create({
  //       onMoveShouldSetPanResponder: () => true,
  //       onPanResponderMove: Animated.event([null, { dy: YAnimation }]),
  //     });
  //   });

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log(pan.y);
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
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Text style={styles.titleText}>Drag this box!</Text>
      <View
        style={{
          // backgroundColor: "red",
          // padding: 10,
          borderRadius: 10,
          // width: 80,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 2,
        }}
      >
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
              { rotateX: pan.y.interpolate({
                    inputRange: [-30, 0, 30],
                    outputRange: [2, 0, 2],
                  }) },
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
          <Text style={{ margin: 10, width: 80, textAlign: "center" }}>
            ENE
          </Text>
          {/* <View style={styles.box} /> */}
        </Animated.View>
      </View>
    </View>
    // <View style={styles.container}>
    //   <Animated.View
    //     {...panResponder.panHandlers}
    //     style={[
    //       { transform: position.getTranslateTransform() },
    //       styles.appStyles,
    //     ]}
    //   >
    //     ><Text>Calendar</Text>
    //   </Animated.View>
    //   {/* {DAYS().map((item, index) => (
    //     <Text key={index}>{item}</Text>
    //   ))} */}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default Calendar;
