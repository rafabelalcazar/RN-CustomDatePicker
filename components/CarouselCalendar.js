import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import Carousel from "react-native-looped-carousel";

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

//   _onLayoutDidChange = (e) => {
//     const layout = e.nativeEvent.layout;
//     this.setState({ size: { width: layout.width, height: layout.height } });
//   };

const CarouselCalendar = (props) => {
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(40);
  const [animationEnded, setAnimationEnded] = useState(null);

  const heightContainer = useRef(new Animated.Value(40)).current;

  const moreHeight = () => {
    // setAnimationEnded(false);
    // console.log("Termino animacion:", animationEnded);
    // Will change containers height in 0.5 seconds
    setAnimationEnded(false);
    Animated.timing(heightContainer, {
      toValue: 80,
      duration: 5,
    }).start();
  };

  const lessHeight = () => {
    setAnimationEnded(true);
    // console.log("decreciendo,Termino anim:", animationEnded);
    setTimeout(() => {
      animationEnded
        ? Animated.timing(heightContainer, {
            toValue: 40,
            duration: 500,
          }).start()
        : lessHeight();
    }, 5000);
    // Will change containers height in 0.5 seconds
    // Animated.timing(heightContainer, {
    //   toValue: 40,
    //   duration: 500,
    // }).start();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Animated.View
        style={[
          styles.boxAnimated,
          {
            height: heightContainer,
          },
        ]}
      >
        <Carousel
          delay={2000}
          style={{
            width: width,
            height: height,
            transform: [{ rotate: "90deg" }],
          }}
          autoplay={false}
          currentPage={2}
          //   onAnimateNextPage={(p) => console.log("hola", p)}
          onScrollBegin={moreHeight}
          onScrollEnd={lessHeight}
        >
          {DATA.map((data) => {
            return (
              <View
                key={data.id}
                style={[
                  {
                    //   backgroundColor: "#BADA55",
                    justifyContent: "center",
                    alignItems: "center",
                    width: width,
                  },
                ]}
              >
                <Text
                  style={[styles.text, { transform: [{ rotate: "-90deg" }] }]}
                >
                  {data.title}
                </Text>
              </View>
            );
          })}
        </Carousel>
      </Animated.View>
    </View>
  );
};

export default CarouselCalendar;

const styles = StyleSheet.create({
  boxAnimated: {
    margin: 5,
    backgroundColor: "blue",
    borderRadius: 10,
    // height: ,
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
  text: {
    height: 40,
    width: 80,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#562482",
    fontWeight: "bold",
  },
});
