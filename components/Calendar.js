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
import PickerContainer from "./PickerContainer/PickerContainer";
import SmoothPicker from "react-native-smooth-picker";
// import TextAnimated from "./PickerContainer/TextAnimated";

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

const Calendar = (props) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [selected, setselected] = useState();

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

  // const handleChange = (index) => {
  //   setselected(index)
  // };

  return (
    <View style={styles.container}>
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
      </View>
      <View style={styles.boxAnimated}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
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
              {/* <Text style={styles.text}>ENE</Text> */}
              <Text
                style={styles.text}
                // onPress={() => {
                //   console.log(`Hola desde ${item.title}`);
                // }}
              >
                {item.title}
              </Text>
            </Animated.View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.boxAnimated}>
        <SmoothPicker
          // offsetSelection={40}
          // magnet
          snapInterval={30}
          snapToAlignment="center"
          scrollAnimation
          data={DATA}
          // onSelected={({ item, index }) => handleChange(index)}
          renderItem={({ item, index }) => (
            <Text style={styles.text}>{item.title}</Text>
          )}
        />
      </View>
      <View style={styles.boxAnimated}>
        {/* <PickerContainer> */}
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Text style={styles.text}>{item.title}</Text>
            )}
            pagingEnabled
            snapToAlignment='center'
          />
        {/* </PickerContainer> */}
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
    margin: 5,
    backgroundColor: "blue",
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
    // height: 30,
    width: 80,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#562482",
    fontWeight: "bold",
    // backgroundColor:'tomato'
  },
});

export default Calendar;
