import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  PanResponder,
  Animated,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
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
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "ENE",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "FEB",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "MAR",
  },
];

var ACTION_TIMER = 400;
var COLORS = ["rgb(2,255,255)", "rgb(111,235,62)"];

const Calendar = (props) => {
  //   const [YAnimation, setYAnimation] = useState(new Animated.Value());

  //   useEffect(() => {
  //     const rpanResponder = PanResponder.create({
  //       onMoveShouldSetPanResponder: () => true,
  //       onPanResponderMove: Animated.event([null, { dy: YAnimation }]),
  //     });
  //   });

  const pan = useRef(new Animated.ValueXY()).current;
  const scaleContainer = useRef(new Animated.Value(40)).current;

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

  const handlePressIn = () => {
    console.log("press in");
    Animated.timing(scaleContainer, {
      duration: 500,
      toValue: 80,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleContainer, {
      duration: 500,
      toValue: 40,
    }).start();
    console.log(scaleContainer);
  };

  const animationActionComplete = () => {
    console.log("se disparó la acción");
  };

  const getProgressStyles = () => {
    var width = scaleContainer.interpolate({
      inputRange: [1, 2],
      outputRange: [10, 400],
    });
    var bgColor = scaleContainer.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS,
    });
    return {
      width: width,
      height: 90,

      backgroundColor: "red",
    };
  };
  console.log(getProgressStyles());

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            {
              width: 60,
              height: 60,
              elevation: 5,
              backgroundColor: "white",
              margin: 5,
              justifyContent:'center',
              alignItems:'center'
            },
            {
              height: scaleContainer,
            },
          ]}
        >
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <View style={styles.boxAnimated}>
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
          <Text style={styles.text}>ENE</Text>
        </Animated.View>
        {/* <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Text style={styles.text}>{item.title}</Text>
          )}
          keyExtractor={(item) => item.id}
        /> */}
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
  boxAnimated: {
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
  text: {
    margin: 10,
    width: 80,
    textAlign: "center",
    color: "#562482",
    fontWeight: "bold",
  },
});

export default Calendar;
