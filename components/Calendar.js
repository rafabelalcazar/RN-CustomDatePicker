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
import InfiniteScroll from "react-native-infinite-looping-scroll";
import { LinearGradient } from "expo-linear-gradient";

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
  {
    id: "58694a0f-3da1-471f-bd96",
    title: "ABR",
  },
  {
    id: "58694a0f-3da1-bd96-145571e29d72",
    title: "MAY",
  },
  {
    id: "0f-3da1-471f-bd96-145571e29d72",
    title: "JUN",
  },
  {
    id: "f-3da1-471f-bd96",
    title: "JUL",
  },
  {
    id: "0f-3da11f-b96",
    title: "AGO",
  },
  {
    id: "0-3da1-4F1f-bd96",
    title: "SEP",
  },
  {
    id: "0-SDda1-471f-bd96",
    title: "OCT",
  },
  {
    id: "0fN1-471f-bd96",
    title: "NOV",
  },
  {
    id: "0f-3DFS1-471f-bd96",
    title: "DIC",
  },
];

const Calendar = (props) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [selected, setSelected] = useState(1);

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

  const onViewRef = React.useRef(({ viewableItems }) => {
    console.log("estamos en", viewableItems[0].item.title);
    setSelected(viewableItems[0].item.title);
    // viewableItems[0].item.title
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

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
        <LinearGradient
          colors={["#FFFFFF", "transparent"]}
          style={{
            // backgroundColor:'yellow',
            borderRadius: 8,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 7,
            zIndex: 1,
          }}
        />
        {/* <PickerContainer> */}
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => {
            console.log(e);
          }}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({ item, index }) => (
            <Text
              onPress={() => {
                setSelected(item.title);
              }}
              style={item.title == selected ? styles.text : styles.normalText}
            >
              {item.title}
            </Text>
          )}
          pagingEnabled
          snapToAlignment="center"
        />
        <LinearGradient
          colors={["transparent", "#FFFFFF"]}
          style={{
            // backgroundColor:'yellow',
            borderRadius: 8,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 7,
            zIndex: 1,
          }}
        />
        {/* </PickerContainer> */}
      </View>
      <View style={styles.boxAnimated}>
        <View style={styles.boxAnimated}>
          <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}></View>
        </View>
        {/* <InfiniteScroll
        getItemLayout={(data, index) => (
          {length: 40, offset: 40 * index, index}
        )}
        offset={40}
          data={[
            { key: "1" },
            { key: "2" },
            { key: "3" },
            { key: "4" },
            { key: "5" },
            { key: "6" },
            { key: "7" },
          ]}
          renderItem={({ item }) => (
           
              <Text style={styles.text}>{item.key}</Text>
            
          )}
        /> */}
        {/* <InfiniteScroll
          data={[
            { key: "1" },
            { key: "2" },
            { key: "3" },
            { key: "4" },
            { key: "5" },
            { key: "6" },
            { key: "7" },
          ]}
          renderItem={({ item }) => <Text style={styles.text}>{item.key}</Text>}
        /> */}
      </View>
    </View>
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
    height: 40,
    width: 80,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#562482",
    fontWeight: "bold",
  },
  normalText: {
    height: 40,
    width: 80,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#562482",
    // fontWeight: "bold",
  },
});

export default Calendar;
