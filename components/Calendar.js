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
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
            toValue:{x:0,y:0}
        }).start()
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
      <Animated.View
        style={{
          transform: [{ translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
          <Text>ENE</Text>
        {/* <View style={styles.box} /> */}
      </Animated.View>
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
